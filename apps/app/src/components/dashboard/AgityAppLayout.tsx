import Head from "next/head";
import React, { ReactNode } from "react";
import { Page, PageContent, PageHeader, PageHeaderLink } from "ui";
import { SessionContextProvider } from "supabase";
import { DashboardServerSideProps } from "../../utils/ssr/serversideprops";

export interface AgityAppLayoutProps extends DashboardServerSideProps {
  title: string;
  links: Array<PageHeaderLink>;
  children: ReactNode;
}

export const AgityAppLayout = ({
  title,
  links,
  children,
}: AgityAppLayoutProps) => {
  return (
    <SessionContextProvider>
      <Page>
        <Head>
          <title>{title}</title>
        </Head>
        <PageHeader links={links} />
        <PageContent>{children}</PageContent>
      </Page>
    </SessionContextProvider>
  );
};
