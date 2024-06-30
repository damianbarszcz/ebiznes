import discord
from discord.ext import commands
from dotenv import load_dotenv
import requests
import json
import os

load_dotenv()

DISCORD_TOKEN = os.getenv('DISCORD_TOKEN')
ollama_url = "http://localhost:11434/api/chat"

intents = discord.Intents.default()
intents.members = True
intents.messages = True
intents.guild_messages = True
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'Bot has connected to Discord as {bot.user}')

@bot.command(name='ollama')
async def ollama_query(ctx, *, query: str):
    try:
        data = {
            "model": "llama3",
            "messages": [{
                "role": "user",
                "content": query
            }],
            "max_length": 2000
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(ollama_url, headers=headers, data=json.dumps(data), stream=True)

        full_response = ""
        if response.status_code == 200:
            for line in response.iter_lines():
                if line:
                    part = json.loads(line.decode('utf-8'))
                    full_response += part.get('message', {}).get('content', '')

            if not full_response:
                full_response = 'Brak odpowiedzi'
            await ctx.send(full_response)
        else:
            await ctx.send(f"Błąd: {response.status_code} - {response.text}")
    except Exception as e:
        await ctx.send(f"Wystąpił błąd: {e}")

bot.run(DISCORD_TOKEN)