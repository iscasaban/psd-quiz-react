import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface ExamTimerProps {
  formattedTime: string;
  isWarning: boolean;
}

export function ExamTimer({ formattedTime, isWarning }: ExamTimerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        mb: 2,
      }}
    >
      <AccessTimeIcon
        sx={{
          color: isWarning ? "warning.main" : "text.secondary",
          transition: "color 0.3s ease",
        }}
      />
      <Typography
        variant="h6"
        component="span"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          color: isWarning ? "warning.main" : "text.primary",
          transition: "color 0.3s ease",
        }}
      >
        {formattedTime}
      </Typography>
      {isWarning && (
        <Typography
          variant="body2"
          sx={{
            color: "warning.main",
            fontWeight: 600,
            ml: 1,
          }}
        >
          Time running low!
        </Typography>
      )}
    </Box>
  );
}
