import React, { createContext, useContext, useState, ReactNode } from 'react';

type Dish = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  count: number;
};

const initialDishes: Dish[] = [
  {
    id: 1,
    name: 'Chocolate Cake',
    category: 'dessert',
    price: 750,
    image: 'https://images.unsplash.com/photo-1618329894287-013abef41671?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 2,
    name: 'Grilled Chicken',
    category: 'main',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1598364879864-d8d33c177b13?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 3,
    name: 'Apple Pie',
    category: 'dessert',
    price: 800,
    image: 'https://images.unsplash.com/photo-1592196527160-648f01f7fb0a?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 4,
    name: 'Steak',
    category: 'main',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1531484350883-2a1d2d8fc65e?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 5,
    name: 'Garlic Bread',
    category: 'starter',
    price: 500,
    image: 'https://images.unsplash.com/photo-1617234517014-865b11c9f85d?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 6,
    name: 'Cheesecake',
    category: 'dessert',
    price: 950,
    image: 'https://images.unsplash.com/photo-1543367011-1e3d6efba7ad?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 7,
    name: 'Ice Cream Sundae',
    category: 'dessert',
    price: 700,
    image: 'https://images.unsplash.com/photo-1594380055321-bb78f713e717?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 8,
    name: 'Brownie',
    category: 'dessert',
    price: 850,
    image: 'https://images.unsplash.com/photo-1552712123-60c6a6ca6a24?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 9,
    name: 'Pasta Carbonara',
    category: 'main',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1587443999570-81f7f819f3db?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 10,
    name: 'Salmon',
    category: 'main',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1625202151474-3c3f01d31461?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 11,
    name: 'Vegetarian Burger',
    category: 'main',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1552820961-bfd5956a5f91?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 12,
    name: 'Caesar Salad',
    category: 'starter',
    price: 900,
    image: 'https://images.unsplash.com/photo-1584627422735-e3b4693198e3?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 13,
    name: 'Tomato Soup',
    category: 'starter',
    price: 700,
    image: 'https://images.unsplash.com/photo-1584627392071-5a8fa3e63f95?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  },
  {
    id: 14,
    name: 'Spring Rolls',
    category: 'starter',
    price: 800,
    image: 'https://images.unsplash.com/photo-1594058285708-bd0eb071120b?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80',
    count: 0
  }
];




// Updated DishesContextType to include selectedDishes
interface DishesContextType {
  dishes: Dish[];
  selectedDishes: Dish[];
  updateDishCount: (id: number, change: number) => void;  // Renamed function to match your implementation
  toggleSelection: (dish: Dish) => void;
  addDish: (newDish: Dish) => void;
}

const DishesContext = createContext<DishesContextType | undefined>(undefined);

interface DishesProviderProps {
  children: ReactNode;
}

export const DishesProvider: React.FC<DishesProviderProps> = ({ children }) => {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);

  const updateDishCount = (id: number, change: number) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.id === id ? { ...dish, count: dish.count + change } : dish
      )
    );
  };

  const toggleSelection = (dish: Dish) => {
    setSelectedDishes((prevSelected) => {
      if (prevSelected.some((selectedDish) => selectedDish.id === dish.id)) {
        return prevSelected.filter((selectedDish) => selectedDish.id !== dish.id);
      } else {
        return [...prevSelected, dish];
      }
    });
  };

  const addDish = (newDish: Dish) => {
    setDishes((prevDishes) => [...prevDishes, newDish]);
  };

  return (
    <DishesContext.Provider value={{ dishes, selectedDishes, updateDishCount, toggleSelection, addDish }}>
      {children}
    </DishesContext.Provider>
  );
};

export const useDishes = () => {
  const context = useContext(DishesContext);
  if (!context) {
    throw new Error('useDishes must be used within a DishesProvider');
  }
  return context;
};
