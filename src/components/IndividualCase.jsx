import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { brown } from '@mui/material/colors';
import ReactFlipCard from 'reactjs-flip-card';
import Person from './Person';
import people from '../data/people.json';
import useSiteStore from '../hooks/useSiteStore';

const styles = {
  name: {
    fontSize: 'clamp(2.5rem, 2.222vw + 2.056rem, 3.75rem)',
    lineHeight: 'clamp(3.75rem, 2vw + 3.35rem, 4.875rem)',
  },
  summaryContainer: {
    position: 'relative',
    mb: '6rem',
    borderRadius: '5px 5px 0 0',
    textAlign: 'left',
    color: brown[900],
    p: 2,
    ':after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      height: '10%',
      width: '100%',
      left: 0,
      background: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/23618/rip.svg) bottom',
      backgroundSize: '100%',
    },
  },
  summaryText: {
    borderLeft: '1px solid silver',
    px: 2,
  },
  peopleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 2,
  },
  wikiLinkContainer: {
    height: '36px',
    width: '36px',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -14,
    left: -22,
    zIndex: 1,
    border: '1px solid silver',
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderCollapse: 'collapse',
    boxSizing: 'border-box',
    ':hover': {
      backgroundColor: '#eee',
    },
  },
  wikiLink: {
    fontFamily: 'serif',
    fontSize: '26px',
  },
};

function WikiLink({ link }) {
  return (
    <Box sx={styles.wikiLinkContainer} onClick={() => window.open(link, 'wikilink', 'rel=noreferrer')}>
      <Typography sx={styles.wikiLink}>W</Typography>
    </Box>
  );
}

function sortAlpha(a, b) {
  if (a.sort < b.sort) {
    return -1;
  }

  if (a.sort > b.sort) {
    return 1;
  }

  return 0;
}

export default function IndividualCase({ details }) {
  const { name, link, summary } = details;
  const flipChoices = useSiteStore((state) => state.flipChoices);
  const checked = useSiteStore((state) => state.checked);

  return (
    <Box sx={{ mb: 20 }}>
      <Paper sx={styles.summaryContainer} elevation={0}>
        <Typography variant="h2" sx={styles.name}>{name}</Typography>
        <Badge
          color="secondary"
          badgeContent="4"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{ my: 3, ml: 2 }}
          slots={{
            badge: () => <WikiLink link={link} />
          }}
        >
          <Typography variant="subtitle1" sx={styles.summaryText}>{summary}</Typography>
        </Badge>
      </Paper>
      <Box sx={styles.peopleContainer}>
        {people.filter((person) => person.case === details.id).sort(sortAlpha).map((person) => {
          return (
            <ReactFlipCard
              key={person.id}
              flipTrigger="disabled"
              flipByProp={checked ? undefined : flipChoices.includes(person.id)}
              containerStyle={{ width: '260px', height: 'auto' }}
              frontComponent={<Person details={person} key={person.id} front />}
              backComponent={<Person details={person} key={person.id} />}
            />
          );
        })}
      </Box>
    </Box>
  );
}
