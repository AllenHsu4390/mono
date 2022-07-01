import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import IcecreamIcon from '@mui/icons-material/Icecream';
import LandscapeIcon from '@mui/icons-material/Landscape';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import PetsIcon from '@mui/icons-material/Pets';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import SpaIcon from '@mui/icons-material/Spa';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useCategories } from '../../hooks/use-categories';

const CategoryIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'cats':
      return <Typography fontWeight={'bold'}>Cats</Typography>;
    case 'dogs':
      return <Typography fontWeight={'bold'}>Dogs</Typography>;
    case 'pets':
      return <PetsIcon fontSize="medium" />;
    case 'nightlife':
      return <NightlifeIcon fontSize="medium" />;
    case 'nature':
      return <LandscapeIcon fontSize="medium" />;
    case 'relax':
      return <SpaIcon fontSize="medium" />;
    case 'games':
      return <SportsEsportsIcon fontSize="medium" />;
    case 'basketball':
      return <SportsBasketballIcon fontSize="medium" />;
    case 'soccer':
      return <SportsSoccerIcon fontSize="medium" />;
    case 'sports':
      return <SportsFootballIcon fontSize="medium" />;
    case 'cafe':
      return <EmojiFoodBeverageIcon fontSize="medium" />;
    case 'dessert':
      return <IcecreamIcon fontSize="medium" />;
    case 'restaurant':
      return <LocalDiningIcon fontSize="medium" />;
    case 'cooking':
      return <SoupKitchenIcon fontSize="medium" />;
    default:
      return <Typography fontWeight={'bold'}>All</Typography>;
  }
};

export const GalleryFilters = () => {
  const theme = useTheme();
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
        <Tab
          key={name}
          value={name}
          label={<CategoryIcon name={name} />}
          disableRipple={true}
          sx={{
            color: `${theme.palette.secondary.dark}`,
          }}
        />
      ))}
    </Tabs>
  );
};
