from datetime import date
import re

filename = "legal.html"

with open(filename, "r", encoding="utf-8") as f:
    content = f.read()

new_date = date.today().isoformat()
new_content = re.sub(r'"dateModified":\s?"\d{4}-\d{2}-\d{2}"',
                     f'"dateModified": "{new_date}"',
                     content)

with open(filename, "w", encoding="utf-8") as f:
    f.write(new_content)
