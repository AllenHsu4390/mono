import { Tab, Tabs, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import LandscapeIcon from '@mui/icons-material/Landscape';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SpaIcon from '@mui/icons-material/Spa';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import IcecreamIcon from '@mui/icons-material/Icecream';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import { useCategories } from '../../hooks/use-categories';

const CategoryIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'cats':
      return <Typography fontWeight={'bold'}>Cats</Typography>;
    case 'dogs':
      return <Typography fontWeight={'bold'}>Dogs</Typography>;
    case 'pets':
      return <PetsIcon fontSize="large" />;
    case 'nightlife':
      return <NightlifeIcon fontSize="large" />;
    case 'nature':
      return <LandscapeIcon fontSize="large" />;
    case 'relax':
      return <SpaIcon fontSize="large" />;
    case 'games':
      return <SportsEsportsIcon fontSize="large" />;
    case 'basketball':
      return <SportsBasketballIcon fontSize="large" />;
    case 'soccer':
      return <SportsSoccerIcon fontSize="large" />;
    case 'sports':
      return <SportsFootballIcon fontSize="large" />;
    case 'cafe':
      return <EmojiFoodBeverageIcon fontSize="large" />;
    case 'dessert':
      return <IcecreamIcon fontSize="large" />;
    case 'restaurant':
      return <LocalDiningIcon fontSize="large" />;
    case 'cooking':
      return <SoupKitchenIcon fontSize="large" />;
    default:
      return <Typography fontWeight={'bold'}>All</Typography>;
  }
};

export const GalleryFilters = () => {
  const { categories, currentCategory, setCurrentCategory, isLoading } =
    useCategories();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentCategory(newValue);
  };

  if (!categories || isLoading) {
    return null;
  }
  return (
    <Tabs
      value={currentCategory}
      onChange={handleChange}
      textColor="primary"
      indicatorColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs"
    >
      {categories.map((name) => (
        <Tab key={name} value={name} label={<CategoryIcon name={name} />} />
      ))}
    </Tabs>
  );
};
