import Head from "next/head";
import React, { ReactNode } from "react";
import { Page, PageContent, PageHeader, PageHeaderLink } from "ui";

export interface AgityAppLayoutProps {
  title: string;
  links: Array<PageHeaderLink>;
  breadcrumbs: Array<PageHeaderLink>;
  children: ReactNode;
}

export const AgityAppLayout = ({
  title,
  links,
  breadcrumbs,
  children,
}: AgityAppLayoutProps) => {
  return (
    <Page>
      <Head>
        <title>{title}</title>
      </Head>
      <PageHeader links={links} breadcrumbs={breadcrumbs} />
      <PageContent>{children}</PageContent>
    </Page>
  );
};
