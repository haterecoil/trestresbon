#!/usr/bin/env python3
"""
Tres Tres Bon Restaurant Data Extractor
Downloads restaurant addresses from trestresbon.fr and saves to JSONL/CSV
"""

import requests
import re
import json
import csv
from pathlib import Path
from datetime import datetime
from typing import List, Dict


def fetch_restaurant_data(url: str = "http://trestresbon.fr/adresses") -> List[Dict]:
    """Fetch and parse restaurant data from the website."""
    print(f"Fetching data from {url}...")
    
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    
    # Extract JSON from the hidden div
    match = re.search(r'id="restauData">(.*?)<\/div>', response.text, re.DOTALL)
    if not match:
        raise ValueError("Could not find restaurant data in the page")
    
    json_str = match.group(1).strip()
    restaurants = json.loads(json_str)
    
    print(f"Found {len(restaurants)} restaurants")
    return restaurants


def clean_restaurant_data(restaurants: List[Dict]) -> List[Dict]:
    """Clean and normalize restaurant data."""
    cleaned = []
    
    for r in restaurants:
        # Extract only the fields we need
        cleaned.append({
            'id': r.get('idRestaurant'),
            'name': r.get('restaurantName', '').strip(),
            'chef': r.get('chefName', '').strip(),
            'street': r.get('street', '').strip(),
            'zip': r.get('zip', '').strip(),
            'city': r.get('city', '').strip(),
            'metro_station': r.get('metroStation', '').strip(),
            'metro_line': r.get('metroLane', ''),
            'latitude': r.get('location_lat'),
            'longitude': r.get('location_long'),
            'type': r.get('typeRestaurantName', ''),
            'cuisine': r.get('typeCuisineName', ''),
            'budget': r.get('budget'),  # 1-4 scale
            'website': r.get('urlSite', ''),
            'description_short': r.get('headDescription', '').strip(),
            'description_long': r.get('coreDescription', '').strip(),
            'image_url': r.get('imageUrl', ''),
            'extracted_at': datetime.now().isoformat()
        })
    
    return cleaned


def save_jsonl(restaurants: List[Dict], filepath: Path):
    """Save restaurants to JSONL format (one JSON object per line)."""
    filepath.parent.mkdir(parents=True, exist_ok=True)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        for r in restaurants:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')
    
    print(f"Saved JSONL: {filepath}")


def save_csv(restaurants: List[Dict], filepath: Path):
    """Save restaurants to CSV format."""
    filepath.parent.mkdir(parents=True, exist_ok=True)
    
    if not restaurants:
        return
    
    fieldnames = restaurants[0].keys()
    
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(restaurants)
    
    print(f"Saved CSV: {filepath}")


def generate_summary(restaurants: List[Dict]) -> Dict:
    """Generate summary statistics."""
    cities = {}
    types = {}
    cuisines = {}
    budgets = {}
    
    for r in restaurants:
        city = r['city'] or 'Unknown'
        cities[city] = cities.get(city, 0) + 1
        
        rest_type = r['type'] or 'Unknown'
        types[rest_type] = types.get(rest_type, 0) + 1
        
        cuisine = r['cuisine'] or 'Unknown'
        cuisines[cuisine] = cuisines.get(cuisine, 0) + 1
        
        budget = r['budget'] or 'Unknown'
        budgets[budget] = budgets.get(budget, 0) + 1
    
    return {
        'total': len(restaurants),
        'by_city': dict(sorted(cities.items(), key=lambda x: -x[1])),
        'by_type': dict(sorted(types.items(), key=lambda x: -x[1])),
        'by_cuisine': dict(sorted(cuisines.items(), key=lambda x: -x[1])),
        'by_budget': budgets
    }


def main():
    """Main extraction workflow."""
    output_dir = Path('data')
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    try:
        # Fetch raw data
        raw_data = fetch_restaurant_data()
        
        # Clean and normalize
        cleaned_data = clean_restaurant_data(raw_data)
        
        # Save in multiple formats
        save_jsonl(cleaned_data, output_dir / f'restaurants_{timestamp}.jsonl')
        save_jsonl(cleaned_data, output_dir / 'restaurants_latest.jsonl')
        
        save_csv(cleaned_data, output_dir / f'restaurants_{timestamp}.csv')
        save_csv(cleaned_data, output_dir / 'restaurants_latest.csv')
        
        # Generate and save summary
        summary = generate_summary(cleaned_data)
        with open(output_dir / 'summary.json', 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2, ensure_ascii=False)
        
        # Print summary
        print("\n" + "="*60)
        print("EXTRACTION SUMMARY")
        print("="*60)
        print(f"Total restaurants: {summary['total']}")
        print(f"\nTop cities:")
        for city, count in list(summary['by_city'].items())[:5]:
            print(f"  {city}: {count}")
        print(f"\nTop types:")
        for t, count in list(summary['by_type'].items())[:5]:
            print(f"  {t}: {count}")
        print(f"\nTop cuisines:")
        for c, count in list(summary['by_cuisine'].items())[:5]:
            print(f"  {c}: {count}")
        
        print("\n✓ Data extraction complete!")
        
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        raise
    except Exception as e:
        print(f"Error processing data: {e}")
        raise


if __name__ == '__main__':
    main()
