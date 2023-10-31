import Container from '@mui/material/Container';
import { brown } from '@mui/material/colors';
import Introduction from './Introduction';
import IndividualCase from './IndividualCase';
import Details from './Details';
import Actions from './Actions';
import cases from '../data/cases.json';

const styles = {
  container: {
    backgroundColor: brown[50],
    px: 2,
    pb: 16,
  },
};

export default function Layout() {
  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Introduction />
      {cases.map((details) => <IndividualCase details={details} key={details.id} />)}
      <Details />
      <Actions />
    </Container>
  );
}
