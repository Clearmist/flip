import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

export default function Introduction() {
  return (
    <Box>
      <Box sx={{ py: 6 }}>
        <Typography variant="h2" sx={{ letterSpacing: 3 }}>What a cluster-fudge😒</Typography>
        <Typography variant="h5" paragraph>
          Think they'll cooperate with prosecutors? Click on an insurrectionist to bet that they'll flip!
        </Typography>
        <Typography variant="h5" paragraph>
          Click the <span style={{ color: blue[500] }}>CHECK</span> button at the bottom if you want to check your selections.
        </Typography>
        <Typography variant="h5">
          Copy your bookmark at the bottom to check back again another time as more people flip!
          Make a drinking game of it with your friends. Worst score buys drinks.
        </Typography>
      </Box>
      <Divider sx={{ mb: 6 }} />
    </Box>
  );
}
