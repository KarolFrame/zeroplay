import httpx
from lxml import etree
from typing import List
import json

# traer acertijo aleatorio desde API Ninjas (necesitas key)
async def get_riddle_api_ninjas(api_key: str):
    url = "https://api.api-ninjas.com/v1/riddles"
    headers = {"X-Api-Key": api_key}
    async with httpx.AsyncClient() as client:
        r = await client.get(url, headers=headers)
        r.raise_for_status()
        return r.json()

# consulta a BoardGameGeek (XML) por id(s)
def fetch_bgg_thing_xml(id_list: List[int]):
    ids = ",".join(map(str, id_list))
    url = f"https://www.boardgamegeek.com/xmlapi2/thing?id={ids}"
    r = httpx.get(url, timeout=30.0)
    r.raise_for_status()
    root = etree.fromstring(r.content)
    items = []
    for item in root.findall("item"):
        name = item.find("name").get("value")
        year = item.find("yearpublished")
        year = year.get("value") if year is not None else None
        items.append({"id": item.get("id"), "name": name, "year": year})
    return items

# generar URL de imagen para una alg
def visualcube_svg_url(alg: str, size: int = 200):
    base = "https://visualcube.api.cubing.net/visualcube.php"
    return f"{base}?fmt=svg&size={size}&alg={httpx.utils.quote(alg)}"
