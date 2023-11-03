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
          Think they'll cooperate with prosecutors? Click on a co-defendant or co-conspirator to bet that they'll flip!
        </Typography>
        <Typography variant="h5" paragraph>
          Click the <span style={{ color: blue[500] }}>CHECK</span> button at the bottom if you want to calculate your score.
        </Typography>
        <Typography variant="h5" paragraph>
          Copy your bookmark at the bottom to check back again another time as more people flip!
        </Typography>
        <Typography variant="h5">
          Make a drinking game of it or submit your bookmarks to a betting pool with your friends to be checked after each person has entered a plea.
        </Typography>
      </Box>
      <Divider sx={{ mb: 6 }} />
    </Box>
  );
}
