import { Box, Button, Typography } from "@mui/material";

interface ModeSelectorProps {
  totalQuestions: number;
  onSelectMode: (mode: "exam" | "practice") => void;
}

export function ModeSelector({
  totalQuestions,
  onSelectMode,
}: ModeSelectorProps) {
  return (
    <Box component="main">
      <Typography variant="h1" color="secondary">
        Professional Scrum Developer™ Certification quiz
      </Typography>

      <div className="card">
        <p>Prepare your PSD I certification with this quiz</p>
        <p>
          Currently, there are {totalQuestions} questions available. In the exam
          mode, 80 will be selected randomly.
        </p>
        <p>
          You can choose a specific range in <strong>practice mode.</strong>
        </p>
        <p>
          In <strong>exam mode,</strong> 80 will be selected randomly.
        </p>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 3,
          mr: 2,
          ml: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSelectMode("exam")}
        >
          Exam Mode
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onSelectMode("practice")}
        >
          Practice Mode
        </Button>
      </Box>
    </Box>
  );
}
