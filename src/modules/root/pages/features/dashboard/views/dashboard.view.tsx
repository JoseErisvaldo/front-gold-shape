import { Alert, Box, Button } from "@mui/material";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { DashboardHeader } from "../components/dashboard-header/dashboard-header";
import { DashboardSkeleton } from "../components/dashboard-skeleton/dashboard-skeleton";
import { SectionTitle } from "../components/section-title/section-title";
import { StatCard } from "../components/stat-card/stat-card";
import { buildDashboardSections } from "../helpers/build-dashboard-sections";
import { useDashboardQuery } from "../queries/use-dashboard-query";

export function DashboardView() {
  const {
    data: totals,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useDashboardQuery();

  const sections = totals ? buildDashboardSections(totals) : [];

  return (
    <PageLayout
      header={
        <DashboardHeader
          isRefreshing={isFetching}
          onRefreshClick={() => refetch()}
        />
      }
    >
      {isError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Carregando..." : "Tentar novamente"}
            </Button>
          }
        >
          Não foi possível carregar os dados do dashboard. Tente novamente.
        </Alert>
      )}

      {isPending && <DashboardSkeleton />}

      {sections.map((section) => (
        <Box
          key={section.id}
          component="section"
          aria-label={section.title}
          sx={{ mb: 4 }}
        >
          <SectionTitle title={section.title} />

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(5, minmax(0, 1fr))",
              },
            }}
          >
            {section.stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </Box>
        </Box>
      ))}
    </PageLayout>
  );
}
