import asyncio
import time
from aioworker import blocking_handler_wrapper, server


def handler(request):
    print(request)
    time.sleep(10)
    return request


if __name__ == "__main__":
    print("start")
    non_block = blocking_handler_wrapper(handler)
    server("localhost", 5000, non_block)

