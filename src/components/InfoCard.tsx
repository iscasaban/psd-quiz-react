import { Card, CardContent } from "@mui/material";
import type { ReactNode } from "react";

interface InfoCardProps {
  children: ReactNode;
}

export function InfoCard({ children }: InfoCardProps) {
  return (
    <Card sx={{ maxWidth: 800, margin: "2rem auto", mb: 3 }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
