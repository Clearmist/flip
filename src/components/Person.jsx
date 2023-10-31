import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import useSiteStore from '../hooks/useSiteStore';
import phrases from '../data/phrases.json';

const styles = {
  card: {
    width: 230,
    height: 300,
    borderCollapse: 'collapse',
    display: 'flex',
    flexDirection: 'column',
  },
  stamp: {
    position: 'absolute',
    transform: 'rotate(0.9turn)',
    borderTop: `6px solid ${green[600]}`,
    borderBottom: `6px double ${green[600]}`,
    top: '3.4rem',
    left: '1.2em',
    textShadow: '2px 2px 2px #eee, 2px -2px 2px #eee, -2px -2px 2px #eee, -2px 2px 2px #eee',
    opacity: .9,
  },
  stampFont: {
    fontSize: '46px',
    color: green[800],
    letterSpacing: 4,
  },
};

function Stamp({ checked, flipped, when }) {
  if (!checked || !flipped) {
    return null;
  }

  return (
    <Box sx={styles.stamp}>
      <Typography sx={styles.stampFont}>Flipped!</Typography>
      <Typography variant="body1" align="right">{when}</Typography>
    </Box>
  );
}

function Actions({ checked, details, front, chose }) {
  const setDetailId = useSiteStore((state) => state.setDetailId);

  const handleDialog = () => {
    console.log(`The user wants to see details of insurrectionist ${details.id}.`);

    setDetailId(details.id);
  };

  const phrase = useMemo(() => {
    return phrases[Math.floor(Math.random() * phrases.length)];
  }, [chose]);

  if (checked && details.flipped) {
    return (
      <CardActions>
        <Button size="small" color="primary" onClick={handleDialog}>
          details
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button size="small" color="primary" onClick={() => window.open(details.source, 'sourcelink', 'rel=noreferrer')}>source</Button>
      </CardActions>
    );
  }

  if (front) {
    return (
      <CardActions>
        <Button size="small" color="primary" onClick={handleDialog}>
          details
        </Button>
      </CardActions>
    );
  }

  return (
    <CardActions sx={{ backgroundColor: `rgb(244 67 54 / 20%)`}}>
      <Typography>{phrase}</Typography>
    </CardActions>
  )
}

export default function Person({ details, front }) {
  const flipChoices = useSiteStore((state) => state.flipChoices);
  const [addChoice, removeChoice] = useSiteStore((state) => [state.addChoice, state.removeChoice]);
  const checked = useSiteStore((state) => state.checked);
  const chose = flipChoices.includes(details.id);

  const handleFlip = () => {
    if (!checked) {
      if (chose) {
        removeChoice(details.id);
      } else {
        addChoice(details.id);
      }
    }
  };

  return (
    <Card sx={styles.card}>
      <CardActionArea onClick={handleFlip}>
        <Stamp checked={checked} flipped={details.flipped} when={details.when} />
        <CardMedia
          component="img"
          height="180"
          image={`images/${details.image[front ? 'front' : 'back']}`}
          alt={details.name}
        />
        <CardContent sx={{ py: 0, px: 1 }}>
          <Typography variant="h4">{details.name}</Typography>
          <Typography variant="overline">{details.function}</Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ flexGrow: 1 }} />
      <Actions checked={checked} front={front} details={details} chose={chose} />
    </Card>
  );
}
