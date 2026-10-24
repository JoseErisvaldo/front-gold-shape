import { FormProvider } from "react-hook-form";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { CreateProductForm } from "../components/create-product-form/create-product-form";
import { CreateProductHeader } from "../components/create-product-header/create-product-header";
import { useCreateProductPage } from "../hooks/use-create-product-page";

export function CreateProductView() {
  const {
    form,
    onSubmit,
    goToList,
    isSubmitting,
    categories,
    isCategoriesLoading,
    isCategoriesError,
  } = useCreateProductPage();

  return (
    <PageLayout header={<CreateProductHeader onBackClick={goToList} />}>
      <FormProvider {...form}>
        <CreateProductForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          categories={categories}
          isCategoriesLoading={isCategoriesLoading}
          isCategoriesError={isCategoriesError}
        />
      </FormProvider>
    </PageLayout>
  );
}
