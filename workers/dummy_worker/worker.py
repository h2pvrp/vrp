import asyncio
import time
from aioworker import blocking_handler_wrapper, server


def handler(request):
    print(request)
    time.sleep(10)
    return {"Routes": []}


if __name__ == "__main__":
    print("Start Dummy Worker")
    non_block = blocking_handler_wrapper(handler)
    server("localhost", 5005, non_block)
