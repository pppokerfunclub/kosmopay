import React from "react";
import { Container, Footer, Header } from "@/components";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";

export const BaseLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Container>
        <Header className="mb-20 mt-6" />
        <Outlet />
      </Container>
      <Footer className="mt-[64px] md:mt-[128px]" />
    </>
  );
};
