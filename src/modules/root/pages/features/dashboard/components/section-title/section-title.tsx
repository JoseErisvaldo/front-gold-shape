import { Typography } from "@mui/material";

type SectionTitleProps = {
  title: string;
};

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <Typography
      component="h2"
      sx={{ mb: 1.5, color: "#292D45", fontSize: 16, fontWeight: 700 }}
    >
      {title}
    </Typography>
  );
}
