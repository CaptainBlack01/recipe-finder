/**
 * FlavorCraft - Recipe Finder & Kitchen Dashboard
 * Vanilla JavaScript (No frameworks, No backend, WebStorage for persistence)
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Initial Preset Dataset (Diverse, Delicious, Reliable Images)
  // ---------------------------------------------------------------------------
  const DEFAULT_RECIPES = [
    {
      id: 'rec-1',
      title: 'Creamy Tuscan Garlic Chicken',
      category: 'Dinner',
      prepTime: 10,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      calories: 540,
      rating: 4.9,
      ratingCount: 124,
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
      description: 'Pan-seared chicken breasts smothered in a rich garlic, sun-dried tomato, and spinach cream sauce.',
      dietary: ['Low-Carb', 'Gluten-Free'],
      isCustom: false,
      ingredients: [
        { amount: 500, unit: 'g', name: 'Chicken breast' },
        { amount: 4, unit: 'cloves', name: 'Garlic' },
        { amount: 150, unit: 'ml', name: 'Heavy cream' },
        { amount: 100, unit: 'g', name: 'Spinach' },
        { amount: 50, unit: 'g', name: 'Sun-dried tomatoes' },
        { amount: 2, unit: 'tbsp', name: 'Olive oil' },
        { amount: 40, unit: 'g', name: 'Parmesan cheese' }
      ],
      instructions: [
        'Season chicken cutlets generously with salt, pepper, and Italian herbs.',
        'Heat olive oil in a skillet over medium-high heat and sear chicken for 5 minutes per side until golden brown. Remove and set aside.',
        'In the same skillet, add minced garlic and sun-dried tomatoes; sauté for 1 minute until fragrant.',
        'Pour in the heavy cream and bring to a gentle simmer. Stir in the parmesan cheese until melted.',
        'Fold in fresh spinach and allow it to wilt in the sauce.',
        'Return the seared chicken into the skillet, spoon the sauce over top, and simmer for another 3 minutes before serving.'
      ]
    },
    {
      id: 'rec-2',
      title: 'Authentic Spaghetti Carbonara',
      category: 'Dinner',
      prepTime: 10,
      cookTime: 15,
      servings: 2,
      difficulty: 'Medium',
      calories: 620,
      rating: 4.8,
      ratingCount: 95,
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
      description: 'Classic Roman pasta made silky with egg yolks, aged pecorino cheese, and crispy guanciale or pancetta.',
      dietary: [],
      isCustom: false,
      ingredients: [
        { amount: 200, unit: 'g', name: 'Spaghetti pasta' },
        { amount: 100, unit: 'g', name: 'Pancetta or bacon' },
        { amount: 2, unit: 'large', name: 'Egg yolks' },
        { amount: 1, unit: 'whole', name: 'Egg' },
        { amount: 50, unit: 'g', name: 'Pecorino or parmesan cheese' },
        { amount: 1, unit: 'tsp', name: 'Black pepper' }
      ],
      instructions: [
        'Bring a pot of salted water to a rolling boil and cook spaghetti until al dente.',
        'Crisp pancetta pieces in a skillet over medium heat until golden. Turn off heat.',
        'In a bowl, whisk whole egg, egg yolks, grated cheese, and plenty of freshly cracked black pepper.',
        'Reserve half cup of pasta water, then drain pasta and immediately toss into the pancetta pan.',
        'Pour in the egg-cheese mixture, tossing rapidly while adding pasta water a splash at a time to form a glossy, silky sauce (do not scramble eggs!).',
        'Serve hot with extra cracked black pepper and cheese.'
      ]
    },
    {
      id: 'rec-3',
      title: 'Avocado Toast with Poached Egg',
      category: 'Breakfast',
      prepTime: 5,
      cookTime: 10,
      servings: 1,
      difficulty: 'Easy',
      calories: 340,
      rating: 4.7,
      ratingCount: 88,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      description: 'Crisp artisan sourdough topped with creamy seasoned avocado, chili flakes, and a delicate runny poached egg.',
      dietary: ['Vegetarian', 'Dairy-Free'],
      isCustom: false,
      ingredients: [
        { amount: 2, unit: 'slices', name: 'Sourdough bread' },
        { amount: 1, unit: 'ripe', name: 'Avocado' },
        { amount: 2, unit: 'large', name: 'Egg' },
        { amount: 1, unit: 'tsp', name: 'Lemon juice' },
        { amount: 1, unit: 'pinch', name: 'Chili flakes' },
        { amount: 1, unit: 'tbsp', name: 'Olive oil' }
      ],
      instructions: [
        'Toast sourdough bread slices until golden brown and crisp.',
        'Mash avocado with lemon juice, salt, and black pepper until chunky-smooth.',
        'Poach the eggs in gently simmering water with a splash of vinegar for 3 to 4 minutes.',
        'Spread the mashed avocado generously over the toasts.',
        'Top each toast with a warm poached egg, sprinkle chili flakes, sea salt, and a drizzle of olive oil.'
      ]
    },
    {
      id: 'rec-4',
      title: 'Mediterranean Chickpea Buddha Bowl',
      category: 'Lunch',
      prepTime: 15,
      cookTime: 15,
      servings: 2,
      difficulty: 'Easy',
      calories: 410,
      rating: 4.9,
      ratingCount: 110,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      description: 'Spiced roasted chickpeas, crisp cucumbers, cherry tomatoes, kalamata olives, and fresh tahini dressing over fluffy quinoa.',
      dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
      isCustom: false,
      ingredients: [
        { amount: 1, unit: 'can', name: 'Chickpeas' },
        { amount: 150, unit: 'g', name: 'Cooked Quinoa or Rice' },
        { amount: 1, unit: 'cup', name: 'Cherry tomatoes' },
        { amount: 1, unit: 'medium', name: 'Cucumber' },
        { amount: 50, unit: 'g', name: 'Kalamata olives' },
        { amount: 2, unit: 'tbsp', name: 'Olive oil' },
        { amount: 2, unit: 'tbsp', name: 'Tahini or hummus' }
      ],
      instructions: [
        'Drain chickpeas, toss with olive oil, cumin, smoked paprika, salt, and roast at 200°C (400°F) for 15 minutes until crispy.',
        'Slice cucumbers and halve cherry tomatoes.',
        'Divide warm cooked quinoa or rice between two serving bowls.',
        'Arrange roasted chickpeas, cucumber slices, tomatoes, and olives in colorful sections.',
        'Drizzle with tahini or hummus thinned with warm water and lemon juice.'
      ]
    },
    {
      id: 'rec-5',
      title: 'Zesty Garlic Butter Shrimp',
      category: 'Dinner',
      prepTime: 5,
      cookTime: 10,
      servings: 3,
      difficulty: 'Easy',
      calories: 320,
      rating: 4.9,
      ratingCount: 76,
      image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
      description: 'Succulent shrimp sautéed in aromatic garlic butter with fresh parsley and a splash of bright lemon.',
      dietary: ['Gluten-Free', 'Low-Carb'],
      isCustom: false,
      ingredients: [
        { amount: 450, unit: 'g', name: 'Shrimp' },
        { amount: 4, unit: 'cloves', name: 'Garlic' },
        { amount: 3, unit: 'tbsp', name: 'Butter' },
        { amount: 1, unit: 'whole', name: 'Lemon' },
        { amount: 2, unit: 'tbsp', name: 'Fresh parsley' },
        { amount: 1, unit: 'pinch', name: 'Red pepper flakes' }
      ],
      instructions: [
        'Peel and devein shrimp; pat completely dry with paper towels and season with salt and black pepper.',
        'Melt 2 tablespoons of butter in a large skillet over medium-high heat.',
        'Add shrimp in a single layer and cook undisturbed for 2 minutes until pink underneath.',
        'Flip shrimp, add minced garlic and red pepper flakes, cooking for 1 minute more.',
        'Remove from heat, swirl in remaining butter, squeeze fresh lemon juice, and toss with chopped parsley.'
      ]
    },
    {
      id: 'rec-6',
      title: 'Fluffy Golden Blueberry Pancakes',
      category: 'Breakfast',
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      difficulty: 'Easy',
      calories: 390,
      rating: 4.8,
      ratingCount: 142,
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
      description: 'Melt-in-your-mouth buttermilk pancakes bursting with sweet ripe blueberries, served with maple syrup.',
      dietary: ['Vegetarian'],
      isCustom: false,
      ingredients: [
        { amount: 250, unit: 'g', name: 'Flour' },
        { amount: 2, unit: 'tbsp', name: 'Sugar' },
        { amount: 2, unit: 'large', name: 'Egg' },
        { amount: 250, unit: 'ml', name: 'Milk' },
        { amount: 40, unit: 'g', name: 'Butter' },
        { amount: 150, unit: 'g', name: 'Blueberries' },
        { amount: 1, unit: 'tsp', name: 'Baking powder' }
      ],
      instructions: [
        'Whisk flour, sugar, baking powder, and a pinch of salt together in a large mixing bowl.',
        'In a separate bowl, whisk milk, eggs, and melted butter.',
        'Pour wet ingredients into dry ingredients, stirring gently just until combined (small lumps are fine).',
        'Heat a non-stick griddle over medium heat and lightly butter the surface.',
        'Pour 1/4 cup batter for each pancake, scatter fresh blueberries on top, and cook until bubbles form on surface (approx 2-3 mins).',
        'Flip carefully and cook 1-2 minutes until golden brown. Serve stacked with pure maple syrup.'
      ]
    },
    {
      id: 'rec-7',
      title: 'Classic Tomato Basil Margherita Pizza',
      category: 'Dinner',
      prepTime: 20,
      cookTime: 12,
      servings: 3,
      difficulty: 'Medium',
      calories: 580,
      rating: 4.9,
      ratingCount: 205,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
      description: 'Crispy blistered pizza crust topped with crushed San Marzano tomatoes, fresh mozzarella, and sweet basil leaves.',
      dietary: ['Vegetarian'],
      isCustom: false,
      ingredients: [
        { amount: 1, unit: 'ball', name: 'Pizza dough' },
        { amount: 150, unit: 'g', name: 'Tomato sauce or crushed tomatoes' },
        { amount: 200, unit: 'g', name: 'Mozzarella cheese' },
        { amount: 1, unit: 'handful', name: 'Fresh basil' },
        { amount: 1, unit: 'tbsp', name: 'Olive oil' },
        { amount: 1, unit: 'clove', name: 'Garlic' }
      ],
      instructions: [
        'Preheat oven to maximum temperature (250°C / 480°F) with baking tray or pizza stone inside.',
        'Stretch pizza dough onto parchment paper into a 12-inch circle.',
        'Spread crushed seasoned tomatoes thinly over the dough, leaving a crust border.',
        'Tear fresh mozzarella balls into chunks and distribute evenly.',
        'Bake for 10-12 minutes until crust is bubbly, browned, and cheese is melted.',
        'Scatter fresh basil leaves over top and finish with a swirl of extra virgin olive oil.'
      ]
    },
    {
      id: 'rec-8',
      title: 'Decadent Dark Chocolate Lava Cakes',
      category: 'Dessert',
      prepTime: 15,
      cookTime: 12,
      servings: 2,
      difficulty: 'Medium',
      calories: 480,
      rating: 5.0,
      ratingCount: 64,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      description: 'Individual warm chocolate cakes with a molten, velvety flowing ganache center.',
      dietary: ['Vegetarian'],
      isCustom: false,
      ingredients: [
        { amount: 100, unit: 'g', name: 'Dark chocolate' },
        { amount: 80, unit: 'g', name: 'Butter' },
        { amount: 2, unit: 'large', name: 'Egg' },
        { amount: 40, unit: 'g', name: 'Sugar' },
        { amount: 25, unit: 'g', name: 'Flour' },
        { amount: 1, unit: 'tsp', name: 'Vanilla extract' }
      ],
      instructions: [
        'Preheat oven to 200°C (400°F). Butter two ramekins and dust with cocoa powder.',
        'Melt dark chocolate and butter together in a heatproof bowl set over simmering water; stir until smooth.',
        'In a bowl, beat eggs and sugar until pale and slightly frothy.',
        'Gently fold melted chocolate into the eggs, then fold in flour and vanilla until just combined.',
        'Divide batter between prepared ramekins and bake for precisely 12 minutes (edges set, center soft).',
        'Let rest 1 minute, loosen edges with a knife, invert onto plates, and serve immediately with vanilla ice cream.'
      ]
    },
    {
      id: 'rec-9',
      title: 'Crispy Veggie & Cheese Quesadillas',
      category: 'Snack',
      prepTime: 10,
      cookTime: 10,
      servings: 2,
      difficulty: 'Easy',
      calories: 420,
      rating: 4.6,
      ratingCount: 51,
      image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80',
      description: 'Toasty flour tortillas stuffed with melted cheddar, sautéed bell peppers, onions, and black beans.',
      dietary: ['Vegetarian'],
      isCustom: false,
      ingredients: [
        { amount: 2, unit: 'large', name: 'Tortillas' },
        { amount: 120, unit: 'g', name: 'Cheese (Cheddar or Monterey Jack)' },
        { amount: 1, unit: 'medium', name: 'Bell pepper' },
        { amount: 0.5, unit: 'medium', name: 'Onion' },
        { amount: 50, unit: 'g', name: 'Black beans or corn' },
        { amount: 1, unit: 'tbsp', name: 'Olive oil or butter' }
      ],
      instructions: [
        'Slice bell pepper and onion into thin strips and sauté in a skillet until tender-crisp.',
        'Heat a clean skillet over medium heat with a tiny dab of butter.',
        'Place one tortilla flat, layer half with shredded cheese, sautéed veggies, black beans, and more cheese.',
        'Fold tortilla over to make a half-moon shape.',
        'Cook 3-4 minutes per side until golden brown and crispy, and cheese is completely melted.',
        'Slice into wedges and serve with salsa and guacamole.'
      ]
    },
    {
      id: 'rec-10',
      title: 'Fresh Garden Greek Salad',
      category: 'Lunch',
      prepTime: 12,
      cookTime: 0,
      servings: 2,
      difficulty: 'Easy',
      calories: 290,
      rating: 4.7,
      ratingCount: 82,
      image: 'https://images.unsplash.com/photo-1540189549387-567ff6c9a091?auto=format&fit=crop&w=800&q=80',
      description: 'Crisp red onions, ripe tomatoes, crisp cucumbers, kalamata olives, and rich feta cheese tossed in oregano dressing.',
      dietary: ['Vegetarian', 'Gluten-Free', 'Low-Carb'],
      isCustom: false,
      ingredients: [
        { amount: 3, unit: 'medium', name: 'Tomato' },
        { amount: 1, unit: 'large', name: 'Cucumber' },
        { amount: 0.5, unit: 'medium', name: 'Red onion' },
        { amount: 100, unit: 'g', name: 'Feta cheese' },
        { amount: 60, unit: 'g', name: 'Kalamata olives' },
        { amount: 3, unit: 'tbsp', name: 'Olive oil' },
        { amount: 1, unit: 'tsp', name: 'Dried oregano' }
      ],
      instructions: [
        'Cut tomatoes into bite-sized wedges and slice cucumber into thick half-moons.',
        'Thinly slice the red onion.',
        'Combine tomatoes, cucumber, onion, and olives in a shallow serving salad bowl.',
        'Place a generous block or crumble of feta cheese over the vegetables.',
        'Drizzle liberally with high-grade extra virgin olive oil, red wine vinegar, and sprinkle dried oregano and sea salt.'
      ]
    },
    {
      id: 'rec-11',
      title: 'Savory Asian Egg Fried Rice',
      category: 'Lunch',
      prepTime: 10,
      cookTime: 10,
      servings: 2,
      difficulty: 'Easy',
      calories: 380,
      rating: 4.8,
      ratingCount: 175,
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
      description: 'Wok-tossed day-old rice with scrambled eggs, scallions, garlic, and savory soy-sesame seasoning.',
      dietary: ['Vegetarian', 'Dairy-Free'],
      isCustom: false,
      ingredients: [
        { amount: 300, unit: 'g', name: 'Cold cooked Rice' },
        { amount: 3, unit: 'large', name: 'Egg' },
        { amount: 2, unit: 'cloves', name: 'Garlic' },
        { amount: 3, unit: 'stalks', name: 'Green onion (scallion)' },
        { amount: 2, unit: 'tbsp', name: 'Soy sauce' },
        { amount: 1, unit: 'tbsp', name: 'Sesame oil or vegetable oil' }
      ],
      instructions: [
        'Beat eggs with a pinch of salt. Heat 1 tbsp oil in a hot wok/pan, scramble eggs lightly, then remove and set aside.',
        'Add another splash of oil to the wok, toss in minced garlic and the white parts of scallions for 30 seconds.',
        'Add cold cooked rice, breaking up any clumps with a spatula over high heat.',
        'Drizzle soy sauce and sesame oil around the edges of the pan, tossing vigorously to coat every grain.',
        'Return scrambled eggs, toss with sliced green scallion tops, and serve steaming hot.'
      ]
    },
    {
      id: 'rec-12',
      title: 'Creamy Berry Chia Pudding',
      category: 'Breakfast',
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      difficulty: 'Easy',
      calories: 260,
      rating: 4.6,
      ratingCount: 40,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      description: 'Nourishing chia seed pudding soaked in almond milk, flavored with pure vanilla and honey, topped with berries.',
      dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
      isCustom: false,
      ingredients: [
        { amount: 3, unit: 'tbsp', name: 'Chia seeds' },
        { amount: 180, unit: 'ml', name: 'Almond milk or milk' },
        { amount: 1, unit: 'tbsp', name: 'Honey or maple syrup' },
        { amount: 0.5, unit: 'tsp', name: 'Vanilla extract' },
        { amount: 50, unit: 'g', name: 'Fresh berries (strawberries/blueberries)' }
      ],
      instructions: [
        'In a jar or glass container, combine chia seeds, milk, honey, and vanilla extract.',
        'Whisk thoroughly with a fork, let rest 5 minutes, then whisk once more to prevent seeds from settling at the bottom.',
        'Cover and chill in the refrigerator for at least 2 hours (or overnight) until thick and gelatinous.',
        'Top with fresh washed berries and a drizzle of honey before savoring.'
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // 2. Storage Keys & State
  // ---------------------------------------------------------------------------
  const STORAGE_KEYS = {
    RECIPES: 'flavorcraft_recipes',
    FAVORITES: 'flavorcraft_favorites',
    PANTRY: 'flavorcraft_pantry',
    GROCERY: 'flavorcraft_grocery'
  };

  const state = {
    recipes: [],
    favorites: new Set(),
    pantry: new Set(),
    groceryList: [],
    
    // UI Filter State
    activeTab: 'all', // 'all', 'favorites', 'pantry', 'custom'
    searchQuery: '',
    selectedCategory: 'all',
    maxCookTime: 90,
    selectedDietary: new Set(),
    selectedDifficulty: 'all',
    selectedMaxCalories: 'all',
    pantryMatchOnly: false,
    sortBy: 'match-desc',

    // Currently opened modal recipe & serving multiplier
    currentModalRecipe: null,
    currentServings: 4
  };

  // ---------------------------------------------------------------------------
  // 3. Storage Initializer & Helpers
  // ---------------------------------------------------------------------------
  function loadFromStorage() {
    // Recipes
    try {
      const storedRecipes = localStorage.getItem(STORAGE_KEYS.RECIPES);
      if (storedRecipes) {
        state.recipes = JSON.parse(storedRecipes);
      } else {
        state.recipes = [...DEFAULT_RECIPES];
        saveRecipes();
      }
    } catch (e) {
      console.error('Failed to load recipes from localStorage', e);
      state.recipes = [...DEFAULT_RECIPES];
    }

    // Favorites
    try {
      const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (storedFavs) {
        state.favorites = new Set(JSON.parse(storedFavs));
      } else {
        state.favorites = new Set(['rec-1', 'rec-7']); // nice initial demo favorites
        saveFavorites();
      }
    } catch (e) {
      state.favorites = new Set();
    }

    // Pantry
    try {
      const storedPantry = localStorage.getItem(STORAGE_KEYS.PANTRY);
      if (storedPantry) {
        state.pantry = new Set(JSON.parse(storedPantry));
      } else {
        // default starter pantry staples
        state.pantry = new Set(['garlic', 'olive oil', 'egg', 'tomato', 'chicken']);
        savePantry();
      }
    } catch (e) {
      state.pantry = new Set();
    }

    // Grocery List
    try {
      const storedGrocery = localStorage.getItem(STORAGE_KEYS.GROCERY);
      if (storedGrocery) {
        state.groceryList = JSON.parse(storedGrocery);
      } else {
        state.groceryList = [
          { id: 'g-1', text: 'Fresh Basil leaves', checked: false },
          { id: 'g-2', text: 'Parmesan cheese block', checked: true }
        ];
        saveGrocery();
      }
    } catch (e) {
      state.groceryList = [];
    }
  }

  function saveRecipes() {
    try {
      localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(state.recipes));
    } catch (e) {
      console.error('Failed to save recipes to localStorage', e);
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([...state.favorites]));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }

  function savePantry() {
    try {
      localStorage.setItem(STORAGE_KEYS.PANTRY, JSON.stringify([...state.pantry]));
    } catch (e) {
      console.error('Failed to save pantry to localStorage', e);
    }
  }

  function saveGrocery() {
    try {
      localStorage.setItem(STORAGE_KEYS.GROCERY, JSON.stringify(state.groceryList));
    } catch (e) {
      console.error('Failed to save grocery to localStorage', e);
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Pantry Matcher Algorithm
  // ---------------------------------------------------------------------------
  // Checks if a recipe ingredient is in user's pantry basket
  function isIngredientInPantry(ingredientName, pantrySet) {
    if (!ingredientName) return false;
    const cleanIng = ingredientName.toLowerCase().trim();
    for (const item of pantrySet) {
      const cleanItem = item.toLowerCase().trim();
      if (cleanIng.includes(cleanItem) || cleanItem.includes(cleanIng)) {
        return true;
      }
    }
    return false;
  }

  function calculatePantryMatch(recipe) {
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      return { matchCount: 0, totalCount: 0, percentage: 0 };
    }
    let matchCount = 0;
    const totalCount = recipe.ingredients.length;

    recipe.ingredients.forEach(ing => {
      if (isIngredientInPantry(ing.name, state.pantry)) {
        matchCount++;
      }
    });

    const percentage = Math.round((matchCount / totalCount) * 100);
    return { matchCount, totalCount, percentage };
  }

  // ---------------------------------------------------------------------------
  // 5. DOM Element References
  // ---------------------------------------------------------------------------
  const dom = {
    // Header
    globalSearchInput: document.getElementById('globalSearchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    openGroceryBtn: document.getElementById('openGroceryBtn'),
    groceryBadge: document.getElementById('groceryBadge'),
    openNewRecipeBtn: document.getElementById('openNewRecipeBtn'),

    // Metrics
    metricTotalRecipes: document.getElementById('metricTotalRecipes'),
    metricFavoriteRecipes: document.getElementById('metricFavoriteRecipes'),
    metricPantryMatches: document.getElementById('metricPantryMatches'),
    metricQuickMeals: document.getElementById('metricQuickMeals'),

    // Pantry
    pantryInput: document.getElementById('pantryInput'),
    addPantryBtn: document.getElementById('addPantryBtn'),
    clearPantryBtn: document.getElementById('clearPantryBtn'),
    pantryChips: document.getElementById('pantryChips'),
    quickPantryPills: document.getElementById('quickPantryPills'),
    matchOnlyPantryCheckbox: document.getElementById('matchOnlyPantryCheckbox'),

    // Sidebar Filters
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),
    categoryGroup: document.getElementById('categoryGroup'),
    cookTimeRange: document.getElementById('cookTimeRange'),
    cookTimeDisplay: document.getElementById('cookTimeDisplay'),
    dietaryGroup: document.getElementById('dietaryGroup'),
    difficultySelect: document.getElementById('difficultySelect'),
    calorieSelect: document.getElementById('calorieSelect'),

    // Content & Grid
    viewTabs: document.getElementById('viewTabs'),
    tabCountAll: document.getElementById('tabCountAll'),
    tabCountFavorites: document.getElementById('tabCountFavorites'),
    tabCountPantry: document.getElementById('tabCountPantry'),
    tabCountCustom: document.getElementById('tabCountCustom'),
    sortSelect: document.getElementById('sortSelect'),
    activeFilterTags: document.getElementById('activeFilterTags'),
    recipeGrid: document.getElementById('recipeGrid'),
    emptyState: document.getElementById('emptyState'),
    emptyResetBtn: document.getElementById('emptyResetBtn'),

    // Recipe Details Modal
    recipeDetailModal: document.getElementById('recipeDetailModal'),
    closeDetailModalBtn: document.getElementById('closeDetailModalBtn'),
    modalRecipeContent: document.getElementById('modalRecipeContent'),

    // Recipe Form Modal
    recipeFormModal: document.getElementById('recipeFormModal'),
    closeFormModalBtn: document.getElementById('closeFormModalBtn'),
    cancelFormBtn: document.getElementById('cancelFormBtn'),
    recipeForm: document.getElementById('recipeForm'),
    formModalTitle: document.getElementById('formModalTitle'),
    formRecipeId: document.getElementById('formRecipeId'),
    formTitle: document.getElementById('formTitle'),
    formCategory: document.getElementById('formCategory'),
    formPrepTime: document.getElementById('formPrepTime'),
    formCookTime: document.getElementById('formCookTime'),
    formServings: document.getElementById('formServings'),
    formDifficulty: document.getElementById('formDifficulty'),
    formImageUrl: document.getElementById('formImageUrl'),
    formCalories: document.getElementById('formCalories'),
    formDescription: document.getElementById('formDescription'),
    formIngredientsList: document.getElementById('formIngredientsList'),
    addIngredientRowBtn: document.getElementById('addIngredientRowBtn'),
    formInstructionsList: document.getElementById('formInstructionsList'),
    addInstructionRowBtn: document.getElementById('addInstructionRowBtn'),

    // Grocery Modal
    groceryModal: document.getElementById('groceryModal'),
    closeGroceryModalBtn: document.getElementById('closeGroceryModalBtn'),
    groceryCountSummary: document.getElementById('groceryCountSummary'),
    groceryInput: document.getElementById('groceryInput'),
    addGroceryItemBtn: document.getElementById('addGroceryItemBtn'),
    clearCompletedGroceryBtn: document.getElementById('clearCompletedGroceryBtn'),
    copyGroceryBtn: document.getElementById('copyGroceryBtn'),
    clearAllGroceryBtn: document.getElementById('clearAllGroceryBtn'),
    groceryItemsContainer: document.getElementById('groceryItemsContainer'),

    // Toasts
    toastContainer: document.getElementById('toastContainer')
  };

  // ---------------------------------------------------------------------------
  // 6. UI Toast Feedback
  // ---------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'warning' ? 'toast-warning' : ''}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.25s ease-in forwards';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, 2800);
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ---------------------------------------------------------------------------
  // 7. Filtering, Sorting & Rendering Recipes
  // ---------------------------------------------------------------------------
  function getFilteredAndSortedRecipes() {
    const query = state.searchQuery.toLowerCase().trim();

    const filtered = state.recipes.filter(recipe => {
      // 1. Tab filter
      if (state.activeTab === 'favorites' && !state.favorites.has(recipe.id)) {
        return false;
      }
      if (state.activeTab === 'custom' && !recipe.isCustom) {
        return false;
      }
      const matchData = calculatePantryMatch(recipe);
      if (state.activeTab === 'pantry' && matchData.percentage < 50) {
        return false;
      }

      // 2. Search query filter
      if (query) {
        const titleMatch = recipe.title.toLowerCase().includes(query);
        const catMatch = recipe.category.toLowerCase().includes(query);
        const ingMatch = recipe.ingredients.some(i => i.name.toLowerCase().includes(query));
        const descMatch = recipe.description && recipe.description.toLowerCase().includes(query);
        if (!titleMatch && !catMatch && !ingMatch && !descMatch) {
          return false;
        }
      }

      // 3. Category filter
      if (state.selectedCategory !== 'all' && recipe.category !== state.selectedCategory) {
        return false;
      }

      // 4. Cook time filter
      if (state.maxCookTime < 90 && recipe.cookTime > state.maxCookTime) {
        return false;
      }

      // 5. Dietary restrictions
      if (state.selectedDietary.size > 0) {
        const recipeDiets = recipe.dietary || [];
        for (const diet of state.selectedDietary) {
          if (!recipeDiets.includes(diet)) {
            return false;
          }
        }
      }

      // 6. Difficulty
      if (state.selectedDifficulty !== 'all' && recipe.difficulty !== state.selectedDifficulty) {
        return false;
      }

      // 7. Max Calories
      if (state.selectedMaxCalories !== 'all') {
        const maxCal = parseInt(state.selectedMaxCalories, 10);
        if (recipe.calories && recipe.calories > maxCal) {
          return false;
        }
      }

      // 8. Pantry Match Only toggle (>= 50%)
      if (state.pantryMatchOnly && matchData.percentage < 50) {
        return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      const matchA = calculatePantryMatch(a);
      const matchB = calculatePantryMatch(b);

      switch (state.sortBy) {
        case 'match-desc':
          if (matchB.percentage !== matchA.percentage) {
            return matchB.percentage - matchA.percentage;
          }
          return b.rating - a.rating;
        case 'time-asc':
          return (a.cookTime + a.prepTime) - (b.cookTime + b.prepTime);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'calories-asc':
          return (a.calories || 9999) - (b.calories || 9999);
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }

  function renderRecipeGrid() {
    const recipesToDisplay = getFilteredAndSortedRecipes();

    // Update Counts & Badges
    updateTabCounts();
    updateMetrics();

    if (recipesToDisplay.length === 0) {
      dom.recipeGrid.innerHTML = '';
      dom.emptyState.style.display = 'block';
      return;
    }

    dom.emptyState.style.display = 'none';

    const cardsHtml = recipesToDisplay.map(recipe => {
      const isFav = state.favorites.has(recipe.id);
      const match = calculatePantryMatch(recipe);

      let pantryBadgeClass = 'pantry-badge-low';
      if (match.percentage >= 70) pantryBadgeClass = 'pantry-badge-high';
      else if (match.percentage >= 40) pantryBadgeClass = 'pantry-badge-medium';

      const dietTagsHtml = (recipe.dietary || []).map(tag => `<span class="diet-tag">${escapeHtml(tag)}</span>`).join('');

      return `
        <article class="recipe-card" data-id="${recipe.id}">
          <div class="card-image-wrap">
            <img class="card-img" src="${escapeHtml(recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80')}" alt="${escapeHtml(recipe.title)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80'">
            <span class="card-category-badge">${escapeHtml(recipe.category)}</span>
            <button class="card-fav-btn ${isFav ? 'is-favorite' : ''}" data-action="toggle-fav" data-id="${recipe.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
              ${isFav ? '❤️' : '🤍'}
            </button>
            <div class="card-pantry-badge ${pantryBadgeClass}">
              🧺 ${match.matchCount}/${match.totalCount} in pantry (${match.percentage}%)
            </div>
          </div>

          <div class="card-body">
            <h3 class="card-title" data-action="open-detail" data-id="${recipe.id}">${escapeHtml(recipe.title)}</h3>
            <p class="card-desc">${escapeHtml(recipe.description || 'Delicious home-cooked recipe made simple.')}</p>

            <div class="card-meta-row">
              <span class="meta-item">⏱️ <strong>${recipe.prepTime + recipe.cookTime}m</strong></span>
              <span class="meta-item">🍽️ <strong>${recipe.servings} serv</strong></span>
              <span class="meta-item">⭐ <strong>${recipe.rating.toFixed(1)}</strong></span>
              ${recipe.calories ? `<span class="meta-item">🔥 <strong>${recipe.calories} kcal</strong></span>` : ''}
            </div>

            <div class="card-tags">
              ${dietTagsHtml}
            </div>

            <div class="card-footer">
              <button class="btn btn-sm btn-primary" data-action="open-detail" data-id="${recipe.id}">
                View Recipe ➔
              </button>
              
              <div class="custom-card-actions">
                ${recipe.isCustom ? `
                  <button class="icon-action-btn" data-action="edit-recipe" data-id="${recipe.id}" title="Edit recipe">✏️</button>
                  <button class="icon-action-btn delete-action-btn" data-action="delete-recipe" data-id="${recipe.id}" title="Delete recipe">🗑️</button>
                ` : ''}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    dom.recipeGrid.innerHTML = cardsHtml;
  }

  function updateTabCounts() {
    dom.tabCountAll.textContent = state.recipes.length;
    dom.tabCountFavorites.textContent = state.favorites.size;
    
    // Pantry ready count (>= 50%)
    const pantryReadyCount = state.recipes.filter(r => calculatePantryMatch(r).percentage >= 50).length;
    dom.tabCountPantry.textContent = pantryReadyCount;

    // Custom creations count
    const customCount = state.recipes.filter(r => r.isCustom).length;
    dom.tabCountCustom.textContent = customCount;
  }

  function updateMetrics() {
    dom.metricTotalRecipes.textContent = state.recipes.length;
    dom.metricFavoriteRecipes.textContent = state.favorites.size;

    const pantryReadyCount = state.recipes.filter(r => calculatePantryMatch(r).percentage >= 50).length;
    dom.metricPantryMatches.textContent = pantryReadyCount;

    const quickCount = state.recipes.filter(r => (r.cookTime + r.prepTime) <= 30).length;
    dom.metricQuickMeals.textContent = quickCount;
  }

  // ---------------------------------------------------------------------------
  // 8. Pantry Manager
  // ---------------------------------------------------------------------------
  function renderPantryChips() {
    if (state.pantry.size === 0) {
      dom.pantryChips.innerHTML = '<span class="pantry-chips-empty">No ingredients added yet. Add some staples!</span>';
      return;
    }

    const sorted = [...state.pantry].sort();
    dom.pantryChips.innerHTML = sorted.map(item => `
      <span class="pantry-chip">
        ${escapeHtml(item)}
        <button class="pantry-chip-remove" data-action="remove-pantry" data-item="${escapeHtml(item)}" title="Remove">&times;</button>
      </span>
    `).join('');
  }

  function addPantryItem(rawText) {
    if (!rawText) return;
    const items = rawText.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    let addedCount = 0;

    items.forEach(item => {
      if (!state.pantry.has(item)) {
        state.pantry.add(item);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      savePantry();
      renderPantryChips();
      renderRecipeGrid();
      showToast(`Added to pantry (${addedCount} items)`, 'success');
    }
  }

  function removePantryItem(item) {
    if (state.pantry.delete(item.toLowerCase())) {
      savePantry();
      renderPantryChips();
      renderRecipeGrid();
    }
  }

  function clearPantry() {
    if (state.pantry.size === 0) return;
    state.pantry.clear();
    savePantry();
    renderPantryChips();
    renderRecipeGrid();
    showToast('Pantry basket cleared');
  }

  // ---------------------------------------------------------------------------
  // 9. Recipe Details Modal & Dynamic Servings Scaler
  // ---------------------------------------------------------------------------
  function openRecipeDetail(recipeId) {
    const recipe = state.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    state.currentModalRecipe = recipe;
    state.currentServings = recipe.servings || 4;

    renderRecipeModalContent();
    dom.recipeDetailModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeRecipeDetail() {
    dom.recipeDetailModal.style.display = 'none';
    document.body.style.overflow = '';
    state.currentModalRecipe = null;
  }

  function adjustModalServings(delta) {
    if (!state.currentModalRecipe) return;
    const newServings = state.currentServings + delta;
    if (newServings >= 1 && newServings <= 24) {
      state.currentServings = newServings;
      renderRecipeModalContent();
    }
  }

  function renderRecipeModalContent() {
    const recipe = state.currentModalRecipe;
    if (!recipe) return;

    const isFav = state.favorites.has(recipe.id);
    const originalServings = recipe.servings || 4;
    const ratio = state.currentServings / originalServings;

    const dietBadgesHtml = (recipe.dietary || []).map(d => `<span class="diet-tag">${escapeHtml(d)}</span>`).join('');

    // Scaled Ingredients List
    const ingredientsHtml = (recipe.ingredients || []).map((ing, idx) => {
      let scaledAmount = '';
      if (typeof ing.amount === 'number') {
        const scaled = ing.amount * ratio;
        scaledAmount = (scaled % 1 === 0) ? scaled : scaled.toFixed(1);
      } else if (ing.amount) {
        scaledAmount = ing.amount;
      }

      const inPantry = isIngredientInPantry(ing.name, state.pantry);

      return `
        <li class="ingredient-item">
          <div class="ingredient-item-left">
            <input type="checkbox" id="modalIng-${idx}" data-name="${escapeHtml(ing.name)}">
            <label for="modalIng-${idx}" class="ingredient-name">
              <strong>${scaledAmount} ${escapeHtml(ing.unit || '')}</strong> ${escapeHtml(ing.name)}
            </label>
          </div>
          <span class="ingredient-pantry-status ${inPantry ? 'status-in-pantry' : 'status-missing'}">
            ${inPantry ? '✓ In Pantry' : '+ Missing'}
          </span>
        </li>
      `;
    }).join('');

    // Instructions with interactive progress
    const instructionsHtml = (recipe.instructions || []).map((step, idx) => `
      <li class="instruction-step" data-step="${idx}">
        <div class="step-number">${idx + 1}</div>
        <div class="step-text">${escapeHtml(step)}</div>
        <button class="step-check-btn" data-action="toggle-step" title="Mark step done">✓</button>
      </li>
    `).join('');

    dom.modalRecipeContent.innerHTML = `
      <div class="modal-hero">
        <img src="${escapeHtml(recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80')}" alt="${escapeHtml(recipe.title)}">
        <div class="modal-hero-overlay">
          <div class="modal-hero-tags">
            <span class="card-category-badge">${escapeHtml(recipe.category)}</span>
            ${dietBadgesHtml}
          </div>
          <h2 class="modal-hero-title">${escapeHtml(recipe.title)}</h2>
          <p style="font-size: 14px; opacity: 0.95;">${escapeHtml(recipe.description || '')}</p>
        </div>
      </div>

      <div class="modal-content-pad">
        <div class="modal-stat-grid">
          <div class="modal-stat-card">
            <span>Prep Time</span>
            <strong>⏱️ ${recipe.prepTime} mins</strong>
          </div>
          <div class="modal-stat-card">
            <span>Cook Time</span>
            <strong>🍳 ${recipe.cookTime} mins</strong>
          </div>
          <div class="modal-stat-card">
            <span>Servings</span>
            <div class="servings-controller">
              <button class="servings-btn" data-action="adjust-servings" data-delta="-1">−</button>
              <span class="servings-count">${state.currentServings}</span>
              <button class="servings-btn" data-action="adjust-servings" data-delta="1">+</button>
            </div>
          </div>
          <div class="modal-stat-card">
            <span>Calories</span>
            <strong>🔥 ${recipe.calories ? Math.round(recipe.calories * (state.currentServings / originalServings)) + ' kcal' : 'N/A'}</strong>
          </div>
        </div>

        <div class="modal-details-split">
          <!-- Left: Ingredients Panel -->
          <div class="ingredients-panel">
            <div class="panel-header-row">
              <h4>Ingredients (${recipe.ingredients.length})</h4>
              <button class="btn btn-xs btn-secondary" data-action="add-missing-to-grocery">
                🛒 Add Missing to Grocery
              </button>
            </div>
            <ul class="ingredient-checklist">
              ${ingredientsHtml}
            </ul>
          </div>

          <!-- Right: Instructions Panel -->
          <div class="instructions-panel">
            <div class="panel-header-row">
              <h4>Preparation Instructions</h4>
              <span style="font-size: 12px; color: #64748b;">Click step to toggle done</span>
            </div>
            <ol class="instruction-steps">
              ${instructionsHtml}
            </ol>
          </div>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <button class="btn btn-secondary" data-action="toggle-modal-fav" data-id="${recipe.id}">
              ${isFav ? '❤️ Saved in Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" data-action="print-recipe">🖨️ Print Recipe</button>
            <button class="btn btn-primary" data-action="close-modal">Done</button>
          </div>
        </div>
      </div>
    `;

    // Bind checkbox change on ingredients inside modal
    dom.modalRecipeContent.querySelectorAll('.ingredient-item input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const label = this.closest('.ingredient-item').querySelector('.ingredient-name');
        if (this.checked) {
          label.classList.add('checked');
        } else {
          label.classList.remove('checked');
        }
      });
    });
  }

  function addMissingIngredientsToGrocery() {
    if (!state.currentModalRecipe) return;
    const recipe = state.currentModalRecipe;
    let addedCount = 0;

    (recipe.ingredients || []).forEach(ing => {
      const inPantry = isIngredientInPantry(ing.name, state.pantry);
      if (!inPantry) {
        // check if already in grocery
        const exists = state.groceryList.some(item => item.text.toLowerCase().includes(ing.name.toLowerCase()));
        if (!exists) {
          state.groceryList.push({
            id: 'g-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            text: `${ing.name} (for ${recipe.title})`,
            checked: false
          });
          addedCount++;
        }
      }
    });

    if (addedCount > 0) {
      saveGrocery();
      updateGroceryBadge();
      showToast(`Added ${addedCount} missing ingredients to Grocery List!`, 'success');
    } else {
      showToast('All ingredients are already in your pantry or shopping list!', 'info');
    }
  }

  // ---------------------------------------------------------------------------
  // 10. Recipe Form Modal (Create / Edit Recipe)
  // ---------------------------------------------------------------------------
  function openRecipeForm(recipeIdToEdit = null) {
    dom.recipeForm.reset();
    dom.formIngredientsList.innerHTML = '';
    dom.formInstructionsList.innerHTML = '';

    if (recipeIdToEdit) {
      const recipe = state.recipes.find(r => r.id === recipeIdToEdit);
      if (!recipe) return;
      dom.formModalTitle.textContent = 'Edit Recipe';
      dom.formRecipeId.value = recipe.id;
      dom.formTitle.value = recipe.title;
      dom.formCategory.value = recipe.category;
      dom.formPrepTime.value = recipe.prepTime;
      dom.formCookTime.value = recipe.cookTime;
      dom.formServings.value = recipe.servings;
      dom.formDifficulty.value = recipe.difficulty;
      dom.formImageUrl.value = recipe.image || '';
      dom.formCalories.value = recipe.calories || '';
      dom.formDescription.value = recipe.description || '';

      // Checkboxes for diet
      document.querySelectorAll('input[name="formDiet"]').forEach(cb => {
        cb.checked = (recipe.dietary || []).includes(cb.value);
      });

      // Ingredients rows
      (recipe.ingredients || []).forEach(ing => addIngredientInputRow(ing.amount, ing.unit, ing.name));

      // Instructions rows
      (recipe.instructions || []).forEach(step => addInstructionInputRow(step));
    } else {
      dom.formModalTitle.textContent = 'Create New Recipe';
      dom.formRecipeId.value = '';
      dom.formServings.value = 4;
      dom.formPrepTime.value = 15;
      dom.formCookTime.value = 25;

      // Seed 3 blank ingredient rows
      addIngredientInputRow('', '', '');
      addIngredientInputRow('', '', '');
      addIngredientInputRow('', '', '');

      // Seed 2 blank step rows
      addInstructionInputRow('');
      addInstructionInputRow('');
    }

    dom.recipeFormModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeRecipeForm() {
    dom.recipeFormModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function addIngredientInputRow(amount = '', unit = '', name = '') {
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.innerHTML = `
      <input type="number" step="any" placeholder="Qty" value="${amount}" style="width: 75px;" class="ing-amount">
      <input type="text" placeholder="Unit (g, tsp, cup)" value="${escapeHtml(unit)}" style="width: 120px;" class="ing-unit">
      <input type="text" placeholder="Ingredient name *" value="${escapeHtml(name)}" style="flex: 1;" class="ing-name" required>
      <button type="button" class="dynamic-row-remove" title="Remove row">✕</button>
    `;
    row.querySelector('.dynamic-row-remove').addEventListener('click', () => row.remove());
    dom.formIngredientsList.appendChild(row);
  }

  function addInstructionInputRow(text = '') {
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.innerHTML = `
      <input type="text" placeholder="Describe this cooking step..." value="${escapeHtml(text)}" style="flex: 1;" class="step-text" required>
      <button type="button" class="dynamic-row-remove" title="Remove step">✕</button>
    `;
    row.querySelector('.dynamic-row-remove').addEventListener('click', () => row.remove());
    dom.formInstructionsList.appendChild(row);
  }

  function handleRecipeFormSubmit(e) {
    e.preventDefault();

    const title = dom.formTitle.value.trim();
    if (!title) return;

    // Collect ingredients
    const ingredientRows = dom.formIngredientsList.querySelectorAll('.dynamic-row');
    const ingredients = [];
    ingredientRows.forEach(row => {
      const name = row.querySelector('.ing-name').value.trim();
      const amountVal = row.querySelector('.ing-amount').value;
      const unit = row.querySelector('.ing-unit').value.trim();
      if (name) {
        ingredients.push({
          amount: amountVal ? parseFloat(amountVal) : '',
          unit: unit,
          name: name
        });
      }
    });

    if (ingredients.length === 0) {
      showToast('Please add at least one ingredient', 'warning');
      return;
    }

    // Collect instructions
    const stepRows = dom.formInstructionsList.querySelectorAll('.dynamic-row');
    const instructions = [];
    stepRows.forEach(row => {
      const text = row.querySelector('.step-text').value.trim();
      if (text) {
        instructions.push(text);
      }
    });

    if (instructions.length === 0) {
      showToast('Please add at least one instruction step', 'warning');
      return;
    }

    // Dietary
    const dietary = [];
    document.querySelectorAll('input[name="formDiet"]:checked').forEach(cb => dietary.push(cb.value));

    const recipeId = dom.formRecipeId.value;
    const isEdit = Boolean(recipeId);

    const recipeData = {
      id: isEdit ? recipeId : 'custom-' + Date.now(),
      title: title,
      category: dom.formCategory.value,
      prepTime: parseInt(dom.formPrepTime.value, 10) || 10,
      cookTime: parseInt(dom.formCookTime.value, 10) || 20,
      servings: parseInt(dom.formServings.value, 10) || 4,
      difficulty: dom.formDifficulty.value,
      calories: dom.formCalories.value ? parseInt(dom.formCalories.value, 10) : null,
      rating: 5.0,
      ratingCount: 1,
      image: dom.formImageUrl.value.trim() || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
      description: dom.formDescription.value.trim() || 'Delicious custom made home recipe.',
      dietary: dietary,
      isCustom: true,
      ingredients: ingredients,
      instructions: instructions
    };

    if (isEdit) {
      const idx = state.recipes.findIndex(r => r.id === recipeId);
      if (idx !== -1) {
        state.recipes[idx] = recipeData;
        showToast('Recipe updated successfully!', 'success');
      }
    } else {
      state.recipes.unshift(recipeData);
      showToast('New recipe added to your dashboard!', 'success');
    }

    saveRecipes();
    closeRecipeForm();
    renderRecipeGrid();
  }

  function deleteRecipe(recipeId) {
    if (!confirm('Are you sure you want to delete this custom recipe?')) return;
    state.recipes = state.recipes.filter(r => r.id !== recipeId);
    state.favorites.delete(recipeId);
    saveRecipes();
    saveFavorites();
    renderRecipeGrid();
    showToast('Recipe deleted', 'info');
  }

  // ---------------------------------------------------------------------------
  // 11. Grocery List Manager
  // ---------------------------------------------------------------------------
  function openGroceryModal() {
    renderGroceryList();
    dom.groceryModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeGroceryModal() {
    dom.groceryModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function updateGroceryBadge() {
    const uncompleted = state.groceryList.filter(item => !item.checked).length;
    if (uncompleted > 0) {
      dom.groceryBadge.textContent = uncompleted;
      dom.groceryBadge.style.display = 'inline-block';
    } else {
      dom.groceryBadge.style.display = 'none';
    }
  }

  function renderGroceryList() {
    updateGroceryBadge();
    const count = state.groceryList.length;
    const completed = state.groceryList.filter(i => i.checked).length;
    dom.groceryCountSummary.textContent = `${count} items (${completed} bought)`;

    if (count === 0) {
      dom.groceryItemsContainer.innerHTML = '<div class="grocery-empty-text">Your shopping list is empty. Add items above or from any recipe!</div>';
      return;
    }

    dom.groceryItemsContainer.innerHTML = state.groceryList.map(item => `
      <div class="grocery-item-row" data-id="${item.id}">
        <div class="grocery-item-left">
          <input type="checkbox" id="gitem-${item.id}" ${item.checked ? 'checked' : ''} data-action="toggle-grocery">
          <label for="gitem-${item.id}" class="grocery-item-title ${item.checked ? 'checked' : ''}">
            ${escapeHtml(item.text)}
          </label>
        </div>
        <button class="grocery-remove-btn" data-action="delete-grocery" title="Remove item">✕</button>
      </div>
    `).join('');
  }

  function addGroceryItem(text) {
    if (!text || !text.trim()) return;
    state.groceryList.push({
      id: 'g-' + Date.now(),
      text: text.trim(),
      checked: false
    });
    saveGrocery();
    renderGroceryList();
    dom.groceryInput.value = '';
    showToast('Item added to grocery list', 'success');
  }

  function toggleGroceryItem(id) {
    const item = state.groceryList.find(i => i.id === id);
    if (item) {
      item.checked = !item.checked;
      saveGrocery();
      renderGroceryList();
    }
  }

  function deleteGroceryItem(id) {
    state.groceryList = state.groceryList.filter(i => i.id !== id);
    saveGrocery();
    renderGroceryList();
  }

  function clearCompletedGrocery() {
    const prev = state.groceryList.length;
    state.groceryList = state.groceryList.filter(i => !i.checked);
    const removed = prev - state.groceryList.length;
    saveGrocery();
    renderGroceryList();
    showToast(`Cleared ${removed} completed items`);
  }

  function clearAllGrocery() {
    if (state.groceryList.length === 0) return;
    if (confirm('Clear entire grocery list?')) {
      state.groceryList = [];
      saveGrocery();
      renderGroceryList();
      showToast('Grocery list cleared');
    }
  }

  function copyGroceryToClipboard() {
    if (state.groceryList.length === 0) {
      showToast('Grocery list is empty', 'warning');
      return;
    }

    const text = state.groceryList.map(item => `[${item.checked ? 'x' : ' '}] ${item.text}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      showToast('Shopping list copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Could not copy to clipboard', 'warning');
    });
  }

  // ---------------------------------------------------------------------------
  // 12. Active Filter Tags & Reset
  // ---------------------------------------------------------------------------
  function renderActiveFilterChips() {
    const chips = [];

    if (state.searchQuery) {
      chips.push({ label: `Search: "${state.searchQuery}"`, key: 'search' });
    }
    if (state.selectedCategory !== 'all') {
      chips.push({ label: `Category: ${state.selectedCategory}`, key: 'category' });
    }
    if (state.maxCookTime < 90) {
      chips.push({ label: `Max Cook: ${state.maxCookTime}m`, key: 'time' });
    }
    if (state.selectedDifficulty !== 'all') {
      chips.push({ label: `Difficulty: ${state.selectedDifficulty}`, key: 'difficulty' });
    }
    if (state.selectedMaxCalories !== 'all') {
      chips.push({ label: `< ${state.selectedMaxCalories} kcal`, key: 'calories' });
    }
    state.selectedDietary.forEach(diet => {
      chips.push({ label: diet, key: 'diet', value: diet });
    });
    if (state.pantryMatchOnly) {
      chips.push({ label: 'Pantry Ready (≥50%)', key: 'pantryOnly' });
    }

    if (chips.length === 0) {
      dom.activeFilterTags.style.display = 'none';
      dom.activeFilterTags.innerHTML = '';
      return;
    }

    dom.activeFilterTags.style.display = 'flex';
    dom.activeFilterTags.innerHTML = chips.map(chip => `
      <span class="filter-tag-chip">
        ${escapeHtml(chip.label)}
        <button type="button" data-action="remove-filter-tag" data-key="${chip.key}" data-val="${chip.value || ''}">✕</button>
      </span>
    `).join('') + `<button id="clearAllFiltersBtn" class="link-btn" style="margin-left: 6px;">Clear filters</button>`;

    const clearAllBtn = document.getElementById('clearAllFiltersBtn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', resetAllFilters);
    }
  }

  function resetAllFilters() {
    state.searchQuery = '';
    dom.globalSearchInput.value = '';
    dom.clearSearchBtn.style.display = 'none';

    state.selectedCategory = 'all';
    document.querySelectorAll('input[name="mealCategory"]').forEach(radio => {
      radio.checked = radio.value === 'all';
      radio.closest('.radio-chip').classList.toggle('active', radio.value === 'all');
    });

    state.maxCookTime = 90;
    dom.cookTimeRange.value = 90;
    dom.cookTimeDisplay.textContent = 'Any time';

    state.selectedDifficulty = 'all';
    dom.difficultySelect.value = 'all';

    state.selectedMaxCalories = 'all';
    dom.calorieSelect.value = 'all';

    state.selectedDietary.clear();
    dom.dietaryGroup.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });

    state.pantryMatchOnly = false;
    dom.matchOnlyPantryCheckbox.checked = false;

    renderActiveFilterChips();
    renderRecipeGrid();
    showToast('Filters reset');
  }

  // ---------------------------------------------------------------------------
  // 13. Event Listeners & Wiring
  // ---------------------------------------------------------------------------
  function bindEvents() {
    // 1. Search Bar
    dom.globalSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      dom.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
      renderActiveFilterChips();
      renderRecipeGrid();
    });

    dom.clearSearchBtn.addEventListener('click', () => {
      state.searchQuery = '';
      dom.globalSearchInput.value = '';
      dom.clearSearchBtn.style.display = 'none';
      renderActiveFilterChips();
      renderRecipeGrid();
    });

    // 2. View Tabs
    dom.viewTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.view-tab');
      if (!btn) return;
      dom.viewTabs.querySelectorAll('.view-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeTab = btn.dataset.tab;
      renderRecipeGrid();
    });

    // 3. Sorting
    dom.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderRecipeGrid();
    });

    // 4. Category Radio Group
    dom.categoryGroup.addEventListener('change', (e) => {
      if (e.target.name === 'mealCategory') {
        state.selectedCategory = e.target.value;
        dom.categoryGroup.querySelectorAll('.radio-chip').forEach(chip => {
          const radio = chip.querySelector('input');
          chip.classList.toggle('active', radio.checked);
        });
        renderActiveFilterChips();
        renderRecipeGrid();
      }
    });

    // 5. Cook Time Range Slider
    dom.cookTimeRange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state.maxCookTime = val;
      dom.cookTimeDisplay.textContent = val >= 90 ? 'Any time' : `≤ ${val} mins`;
      renderActiveFilterChips();
      renderRecipeGrid();
    });

    // 6. Dietary Checkboxes
    dom.dietaryGroup.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        if (e.target.checked) {
          state.selectedDietary.add(e.target.value);
        } else {
          state.selectedDietary.delete(e.target.value);
        }
        renderActiveFilterChips();
        renderRecipeGrid();
      }
    });

    // 7. Difficulty Select
    dom.difficultySelect.addEventListener('change', (e) => {
      state.selectedDifficulty = e.target.value;
      renderActiveFilterChips();
      renderRecipeGrid();
    });

    // 8. Calories Select
    dom.calorieSelect.addEventListener('change', (e) => {
      state.selectedMaxCalories = e.target.value;
      renderActiveFilterChips();
      renderRecipeGrid();
    });

    // 9. Reset Filters Button
    dom.resetFiltersBtn.addEventListener('click', resetAllFilters);
    dom.emptyResetBtn.addEventListener('click', resetAllFilters);

    // 10. Pantry Match Only Checkbox
    dom.matchOnlyPantryCheckbox.addEventListener('change', (e) => {
      state.pantryMatchOnly = e.target.checked;
      renderActiveFilterChips();
      renderRecipeGrid();
    });

    // 11. Pantry Controls
    dom.addPantryBtn.addEventListener('click', () => {
      addPantryItem(dom.pantryInput.value);
      dom.pantryInput.value = '';
    });

    dom.pantryInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addPantryItem(dom.pantryInput.value);
        dom.pantryInput.value = '';
      }
    });

    dom.clearPantryBtn.addEventListener('click', clearPantry);

    // Quick tag pills
    dom.quickPantryPills.addEventListener('click', (e) => {
      const tagBtn = e.target.closest('.quick-tag');
      if (tagBtn) {
        addPantryItem(tagBtn.dataset.ing);
      }
    });

    // Pantry chip remove click delegation
    dom.pantryChips.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-action="remove-pantry"]');
      if (removeBtn) {
        removePantryItem(removeBtn.dataset.item);
      }
    });

    // 12. Active Filter Tags delegation
    dom.activeFilterTags.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="remove-filter-tag"]');
      if (!btn) return;
      const key = btn.dataset.key;
      if (key === 'search') {
        state.searchQuery = '';
        dom.globalSearchInput.value = '';
        dom.clearSearchBtn.style.display = 'none';
      } else if (key === 'category') {
        state.selectedCategory = 'all';
        document.querySelectorAll('input[name="mealCategory"]').forEach(r => {
          r.checked = r.value === 'all';
          r.closest('.radio-chip').classList.toggle('active', r.value === 'all');
        });
      } else if (key === 'time') {
        state.maxCookTime = 90;
        dom.cookTimeRange.value = 90;
        dom.cookTimeDisplay.textContent = 'Any time';
      } else if (key === 'difficulty') {
        state.selectedDifficulty = 'all';
        dom.difficultySelect.value = 'all';
      } else if (key === 'calories') {
        state.selectedMaxCalories = 'all';
        dom.calorieSelect.value = 'all';
      } else if (key === 'diet') {
        state.selectedDietary.delete(btn.dataset.val);
        const cb = dom.dietaryGroup.querySelector(`input[value="${btn.dataset.val}"]`);
        if (cb) cb.checked = false;
      } else if (key === 'pantryOnly') {
        state.pantryMatchOnly = false;
        dom.matchOnlyPantryCheckbox.checked = false;
      }
      renderActiveFilterChips();
      renderRecipeGrid();
    });

    // 13. Recipe Grid Delegated Clicks (View, Favorite, Edit, Delete)
    dom.recipeGrid.addEventListener('click', (e) => {
      // Toggle favorite
      const favBtn = e.target.closest('[data-action="toggle-fav"]');
      if (favBtn) {
        e.stopPropagation();
        const id = favBtn.dataset.id;
        if (state.favorites.has(id)) {
          state.favorites.delete(id);
          showToast('Removed from favorites');
        } else {
          state.favorites.add(id);
          showToast('Added to favorites!', 'success');
        }
        saveFavorites();
        renderRecipeGrid();
        return;
      }

      // Open detail
      const detailTrigger = e.target.closest('[data-action="open-detail"]');
      if (detailTrigger) {
        openRecipeDetail(detailTrigger.dataset.id);
        return;
      }

      // Edit custom recipe
      const editBtn = e.target.closest('[data-action="edit-recipe"]');
      if (editBtn) {
        e.stopPropagation();
        openRecipeForm(editBtn.dataset.id);
        return;
      }

      // Delete custom recipe
      const delBtn = e.target.closest('[data-action="delete-recipe"]');
      if (delBtn) {
        e.stopPropagation();
        deleteRecipe(delBtn.dataset.id);
        return;
      }
    });

    // 14. Recipe Detail Modal Events
    dom.closeDetailModalBtn.addEventListener('click', closeRecipeDetail);
    dom.recipeDetailModal.addEventListener('click', (e) => {
      if (e.target === dom.recipeDetailModal) closeRecipeDetail();
    });

    dom.modalRecipeContent.addEventListener('click', (e) => {
      // Servings adjust
      const servingBtn = e.target.closest('[data-action="adjust-servings"]');
      if (servingBtn) {
        const delta = parseInt(servingBtn.dataset.delta, 10);
        adjustModalServings(delta);
        return;
      }

      // Add missing to grocery
      if (e.target.closest('[data-action="add-missing-to-grocery"]')) {
        addMissingIngredientsToGrocery();
        return;
      }

      // Modal favorite toggle
      const modalFavBtn = e.target.closest('[data-action="toggle-modal-fav"]');
      if (modalFavBtn) {
        const id = modalFavBtn.dataset.id;
        if (state.favorites.has(id)) {
          state.favorites.delete(id);
          showToast('Removed from favorites');
        } else {
          state.favorites.add(id);
          showToast('Added to favorites!', 'success');
        }
        saveFavorites();
        renderRecipeGrid();
        renderRecipeModalContent();
        return;
      }

      // Step done toggle
      const stepBtn = e.target.closest('[data-action="toggle-step"]');
      if (stepBtn) {
        const stepRow = stepBtn.closest('.instruction-step');
        stepRow.classList.toggle('step-completed');
        return;
      }

      // Print recipe
      if (e.target.closest('[data-action="print-recipe"]')) {
        window.print();
        return;
      }

      // Close modal
      if (e.target.closest('[data-action="close-modal"]')) {
        closeRecipeDetail();
        return;
      }
    });

    // 15. Create / Edit Recipe Modal Events
    dom.openNewRecipeBtn.addEventListener('click', () => openRecipeForm(null));
    dom.closeFormModalBtn.addEventListener('click', closeRecipeForm);
    dom.cancelFormBtn.addEventListener('click', closeRecipeForm);
    dom.recipeFormModal.addEventListener('click', (e) => {
      if (e.target === dom.recipeFormModal) closeRecipeForm();
    });
    dom.addIngredientRowBtn.addEventListener('click', () => addIngredientInputRow('', '', ''));
    dom.addInstructionRowBtn.addEventListener('click', () => addInstructionInputRow(''));
    dom.recipeForm.addEventListener('submit', handleRecipeFormSubmit);

    // 16. Grocery List Modal Events
    dom.openGroceryBtn.addEventListener('click', openGroceryModal);
    dom.closeGroceryModalBtn.addEventListener('click', closeGroceryModal);
    dom.groceryModal.addEventListener('click', (e) => {
      if (e.target === dom.groceryModal) closeGroceryModal();
    });

    dom.addGroceryItemBtn.addEventListener('click', () => {
      addGroceryItem(dom.groceryInput.value);
    });

    dom.groceryInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addGroceryItem(dom.groceryInput.value);
      }
    });

    dom.clearCompletedGroceryBtn.addEventListener('click', clearCompletedGrocery);
    dom.copyGroceryBtn.addEventListener('click', copyGroceryToClipboard);
    dom.clearAllGroceryBtn.addEventListener('click', clearAllGrocery);

    dom.groceryItemsContainer.addEventListener('click', (e) => {
      const row = e.target.closest('.grocery-item-row');
      if (!row) return;
      const id = row.dataset.id;

      if (e.target.closest('[data-action="delete-grocery"]')) {
        deleteGroceryItem(id);
      } else if (e.target.closest('[data-action="toggle-grocery"]')) {
        toggleGroceryItem(id);
      }
    });

    // 17. Escape key to close modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (dom.recipeDetailModal.style.display !== 'none') closeRecipeDetail();
        if (dom.recipeFormModal.style.display !== 'none') closeRecipeForm();
        if (dom.groceryModal.style.display !== 'none') closeGroceryModal();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 14. Initialization
  // ---------------------------------------------------------------------------
  function init() {
    loadFromStorage();
    renderPantryChips();
    updateGroceryBadge();
    bindEvents();
    renderRecipeGrid();
  }

  // Kickoff on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

