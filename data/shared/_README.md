# Shared Data Files

**⚠️ PROOF OF CONCEPT - TO BE IMPROVED**

These JSON files are initial scaffolding for the MVP. They need to be:

1. **Enriched from knowledge base** - Extract real data from `/knowledge/` folder
2. **Validated against 12go data** - Cross-reference with synced schedule data
3. **Expanded** - Add all operators, terminals, and cities from our routes

## Files

| File | Status | Notes |
|------|--------|-------|
| `operators.json` | POC | Need logos, accurate ratings, complete amenities |
| `terminals.json` | POC | Need accurate addresses, coordinates, facilities |
| `cities.json` | POC | Need accurate coordinates, attractions, images |
| `bus-classes.json` | POC | Fairly complete, minor adjustments needed |

## TODO

- [ ] Run extraction script to pull operator data from scraped content
- [ ] Validate terminal addresses against Google Maps
- [ ] Add images for all cities/destinations
- [ ] Cross-reference ratings with 12go API data
