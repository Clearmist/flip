import { Fragment } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useSiteStore from '../hooks/useSiteStore';
import people from '../data/people.json';

export default function Details() {
  const [detailId, setDetailId] = useSiteStore((state) => [state.detailId, state.setDetailId]);

  if (detailId === null) {
    return null;
  }

  const person = people.filter((person) => person.id === detailId);

  if (person.length === 0) {
    return null;
  }

  return (
    <Dialog onClose={() => setDetailId(null)} open={detailId !== null}>
      <DialogTitle>{person[0].name}</DialogTitle>
      <List sx={{ pt: 0 }} dense>
        {person[0].details.map((detail, index) => (
          <Fragment key={`key_${index}`}>
          <ListItem sx={{ px: 2 }} disableGutters>
            <ListItemText primary={detail} />
          </ListItem>
          {index + 1 !== person[0].details.length ? <Divider component="li" /> : null}
          </Fragment>
        ))}
      </List>
    </Dialog>
  );
}
