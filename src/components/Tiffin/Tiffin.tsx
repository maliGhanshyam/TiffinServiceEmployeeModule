import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Chip } from '@mui/material';
import { tiffin } from '../../Types';
interface TiffinCardProps {
  tiffin: tiffin;
}

const TiffinCard: React.FC<TiffinCardProps> = ({ tiffin }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        alt={tiffin.tiffin_name}
        height="200"
        image={tiffin.tiffin_image_url}
        title={tiffin.tiffin_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {tiffin.tiffin_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tiffin.tiffin_description}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Chip label={`Price: $${tiffin.tiffin_price}`} color="primary" />
          <Chip label={`Qty: ${tiffin.tiffin_available_quantity}`} color="secondary" />
        </Box>
        <Grid container spacing={1} mt={1}>
          <Grid item>
            <Chip label={tiffin.tiffin_type[0].toUpperCase()} color={tiffin.tiffin_type[0] === "veg" ? "success" : "error"} />
          </Grid>
          <Grid item>
            <Chip label={`Rating: ${tiffin.tiffin_rating}`} color="default" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TiffinCard;
