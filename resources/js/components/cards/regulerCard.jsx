import * as React from 'react';
import {Card, CardContent, Box, Typography, CardActionArea} from '@mui/material';

const cards = [
  {
    id: 1,
    title: 'Total A',
    description: 'Plants are essential for all life.',
  },
  {
    id: 2,
    title: 'Animals',
    description: 'Animals are a part of nature.',
  },
  {
    id: 3,
    title: 'Humans',
    description: 'Humans depend on plants and animals for survival.',
  },
  {
    id: 4,
    title: 'Humans',
    description: 'Humans depend on plants and animals for survival.',
  },
];

function RegularCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box
    className={'row w-100 pr-0'}
      sx={{
        width: '100%'
      }}
    >
      {cards.map((card, index) => (
        <Card key={index} className={`col-md-3 ${card.id === cards.length ? "pr-0" : ""}`}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            className='bg-light'
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default RegularCard;