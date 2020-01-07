import asyncio
from aiohttp import ClientSession


URL = "http://localhost:5000"

async def main():
    async with ClientSession() as session:
        async with session.get(URL) as resp:
            print(await resp.text())
        async with session.post(URL, json={"test": "TAK"}) as resp:
            print(await resp.json())


if __name__ == "__main__":
    asyncio.run(main())

