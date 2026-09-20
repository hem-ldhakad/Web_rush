"""
Spotify Query & Pagination Helper (spotapi / spotipy integration)
Demonstrates batch song pagination (100 songs/batch) and query search.
"""

def query_and_paginate_songs(artist_query="weezer", limit=20):
    try:
        from spotapi import Song

        song = Song()
        
        # 1. Paginate 100 songs at a time
        print(f"--- Paginating all songs for '{artist_query}' ---")
        gen = song.paginate_songs(artist_query)
        for batch in gen:
            for idx, item in enumerate(batch):
                print(idx, item['item']['data']['name'])
        
        # 2. Query specific amount
        print(f"\n--- Querying top {limit} songs for '{artist_query}' ---")
        songs = song.query_songs(artist_query, limit=limit)
        data = songs["data"]["searchV2"]["tracksV2"]["items"]
        for idx, item in enumerate(data):
            print(idx, item['item']['data']['name'])

    except ImportError:
        print("Note: spotapi is not installed. Install via `pip install spotapi`.")

if __name__ == "__main__":
    query_and_paginate_songs()
