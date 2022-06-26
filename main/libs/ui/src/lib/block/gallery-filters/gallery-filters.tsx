import { Box, Tab, Tabs } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import LandscapeIcon from '@mui/icons-material/Landscape';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useCategories } from '../../hooks/use-categories';

const CategoryIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'pets':
      return <PetsIcon fontSize="large" />;
    case 'nightlife':
      return <NightlifeIcon fontSize="large" />;
    case 'nature':
      return <LandscapeIcon fontSize="large" />;
    case 'games':
      return <SportsEsportsIcon fontSize="large" />;
    default:
      return <AllInclusiveIcon fontSize="large" />;
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
