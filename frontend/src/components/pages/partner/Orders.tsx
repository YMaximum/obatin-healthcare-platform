'use client';
import NavbarPartner from '@/components/organisms/navbar/NavbarPartner';
import PartnerOrdersTable from '@/components/organisms/table/PartnerOrderTable';
import { Container } from '@/styles/Global.styles';
import AO from '@/styles/pages/admin/AdminOrders.styles';

const OrdersPage = () => {
  return (
    <>
      <Container>
        <NavbarPartner />
        <AO.CustomSection>
          <PartnerOrdersTable />
        </AO.CustomSection>
      </Container>
    </>
  );
};

export default OrdersPage;
