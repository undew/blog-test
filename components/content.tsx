import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Date from './date';
import { Button, CardActionArea, CardActions } from '@mui/material';
import styles from '../styles/card.module.scss'

export default function MultiActionAreaCard({ image, title, date }): JSX.Element {
  return (
    <div className={styles.card}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <Date dateString={date} />
            </Typography>
            <Typography gutterBottom variant="h5" component="div" className={styles.height}>
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
      </Card>
    </div>
  );
}