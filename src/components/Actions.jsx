import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { grey } from '@mui/material/colors';
import { Typography } from '@mui/material';
import useSiteStore from '../hooks/useSiteStore';
import people from '../data/people.json';

const styles = {
  container: {
    backgroundColor: grey[100],
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    px: 1,
    pt: 1,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    textAlign: 'center',
    gap: 2,
  },
  bookmark: {
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
}

export default function Actions() {
  const bookmark = useSiteStore((state) => state.bookmark);
  const runCheck = useSiteStore((state) => state.runCheck);
  const flipChoices = useSiteStore((state) => state.flipChoices);
  const checked = useSiteStore((state) => state.checked);

  let correct = '?';

  if (checked) {
    correct = 0;

    people.forEach((person) => {
      if (person.flipped && flipChoices.includes(person.id)) {
        correct += 1;
      }

      if (!person.flipped && !flipChoices.includes(person.id)) {
        correct += 1;
      }
    });
  }

  return (
    <Paper sx={styles.container} elevation={3}>
      <Box sx={styles.row}>
        <ButtonGroup aria-label="check and submit">
          <Button variant="contained" key="check" onClick={() => runCheck(true)}>Check</Button>
          <Button key="reset" onClick={() => runCheck(false)}>Reset</Button>
        </ButtonGroup>
        <Typography sx={{ fontSize: 25 }}>Score: {correct}/{people.length}</Typography>
      </Box>
      <Box sx={{ ...styles.row, mt: 2 }}>
        <TextField
          value={bookmark}
          label="Bookmark"
          variant="outlined"
          size="small"
          sx={styles.bookmark}
          InputProps={{
            onClick: (event) => event.target.select(),
          }}
          inputProps={{
            sx: { cursor: 'pointer' }
          }}
        />
      </Box>
      <Box sx={{ ...styles.row, mt: 1 }}>
        <Typography variant="body2">
          Made with 🤣 by&nbsp;
          <Link href="https://github.com/Clearmist" variant="body2">Matthew Sanders</Link>.
          Did someone just flip? Post an issue on&nbsp;
          <Link href="https://github.com/Clearmist/flip/issues" variant="body2">Github</Link>
          &nbsp;to let me know.
        </Typography>
      </Box>
    </Paper>
  );
}
