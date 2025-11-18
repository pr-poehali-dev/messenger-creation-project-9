#!/usr/bin/env python3
from py_vapid import Vapid

vapid = Vapid()
vapid.generate_keys()

print("=== VAPID Keys ===")
print("\nВставьте эти ключи в секреты проекта:\n")
print("VAPID_PUBLIC_KEY:")
print(vapid.public_key.public_bytes().decode('utf-8'))
print("\nVAPID_PRIVATE_KEY:")
print(vapid.private_key.private_bytes().decode('utf-8'))
