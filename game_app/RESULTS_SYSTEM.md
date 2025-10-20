# 🎯 Results System Documentation

## How to Add New Result Categories

The results system is designed to be easily customizable. Here's how to add new result categories:

### 1. Add Images to Assets Folder

Add your result images to the `assets/` folder with these names:
- `water_guardian.jpg` - For Water Guardian result
- `clean_water_champion.jpg` - For Clean Water Champion result  
- `water_warrior.jpg` - For Water Warrior result
- `learning_protector.jpg` - For Learning Water Protector result
- `pollution_fighter.jpg` - For Pollution Fighter result
- `water_explorer.jpg` - For Water Explorer result

### 2. Modify Result Categories

In `game.js`, find the `resultCategories` array and modify it:

```javascript
const resultCategories = [
  {
    name: "Your Category Name",
    condition: (raindrops, trash) => raindrops >= 20 && trash <= 5,
    image: "assets/your_image.jpg",
    title: "🏆 Your Title",
    quote: "Your motivational quote about water conservation!"
  },
  // Add more categories here...
];
```

### 3. Condition Examples

Here are examples of different conditions you can use:

```javascript
// High raindrops, low trash
condition: (raindrops, trash) => raindrops >= 20 && trash <= 5

// Balanced performance
condition: (raindrops, trash) => raindrops >= 15 && trash <= 10

// More trash than raindrops
condition: (raindrops, trash) => trash > raindrops

// Minimum raindrops collected
condition: (raindrops, trash) => raindrops >= 5

// Specific ratio
condition: (raindrops, trash) => raindrops / (trash + 1) >= 2

// Time-based (if you add time tracking)
condition: (raindrops, trash) => raindrops >= 10 && timeRemaining > 30
```

### 4. Adding New Categories

To add a new category, insert it in the `resultCategories` array:

```javascript
{
  name: "Ocean Hero",
  condition: (raindrops, trash) => raindrops >= 30 && trash <= 3,
  image: "assets/ocean_hero.jpg",
  title: "🌊 Ocean Hero",
  quote: "You're an ocean hero! Your incredible skill in collecting clean water while avoiding pollution shows you're a true environmental champion."
}
```

### 5. Category Priority

Categories are checked in order, so put more specific conditions first:

1. **Most Specific** (e.g., 30+ raindrops, 0 trash)
2. **Very Good** (e.g., 20+ raindrops, ≤5 trash)  
3. **Good** (e.g., 15+ raindrops, ≤10 trash)
4. **Learning** (e.g., 5+ raindrops)
5. **Challenging** (e.g., more trash than raindrops)
6. **Default** (always true - fallback)

### 6. Image Requirements

- **Format**: JPG or PNG
- **Size**: 200x200px (will be automatically resized)
- **Content**: Should represent the result category
- **Style**: Match the water conservation theme

### 7. Quote Guidelines

- Keep quotes positive and educational
- Focus on water conservation facts
- Make them motivational
- Keep them concise (1-2 sentences)
- Include environmental awareness messages

## Example Result Categories

```javascript
// Perfect Performance
{
  name: "Water Master",
  condition: (raindrops, trash) => raindrops >= 25 && trash === 0,
  image: "assets/water_master.jpg",
  title: "🏆 Water Master",
  quote: "Perfect! You collected clean water without hitting any pollution. You're a true water conservation master!"
}

// Speed Demon
{
  name: "Rapid Collector", 
  condition: (raindrops, trash) => raindrops >= 20 && trash <= 2,
  image: "assets/rapid_collector.jpg",
  title: "⚡ Rapid Collector",
  quote: "Amazing speed and accuracy! You quickly collected clean water while avoiding pollution. Speed and precision make a great water protector!"
}
```

## Tips for Customization

1. **Test Different Conditions**: Try various raindrop/trash combinations
2. **Balance Difficulty**: Make sure all players get meaningful results
3. **Educational Content**: Use quotes to teach about water conservation
4. **Visual Appeal**: Choose images that match the water theme
5. **Motivational**: Keep all results positive and encouraging

The system will automatically select the first matching condition, so order your categories from most specific to least specific!
