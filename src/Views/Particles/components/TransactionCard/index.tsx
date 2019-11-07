import React from 'react';
import styled from 'styled-components';
import { FlexRow, FlexCol, Text, Card, Button } from '@zopauk/react-components';

const TransactionCard = ({
  timestamp,
  amount,
  merchant,
  category,
  description
}: any) => {
  const currentDate = new Date(timestamp);
  const date = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const dateString = `${date}/${month}/${year}`;
  return (
    <SCard type='card' style={{ padding: '1em' }}>
      <FlexRow>
        <SFlexCol xs={3}>
          <Text as={'label'}>
            {merchant ? merchant : description.substring(0, 20) + '...'}
          </Text>
        </SFlexCol>
        <SFlexCol xs={2}>
          <Text as={'label'}>{dateString}</Text>
        </SFlexCol>
        <SFlexCol xs={3}>
          <Text as={'label'}>£{amount}</Text>
        </SFlexCol>
        <SFlexCol xs={2}>
          <Button sizing={'small'} styling={'secondary'}>
            View
          </Button>
        </SFlexCol>
        <SFlexCol xs={2}>
          <Text as={'label'}>{category}</Text>
        </SFlexCol>
      </FlexRow>
    </SCard>
  );
};

const SCard = styled(Card)`
  margin-bottom: 1em;
`;

const SFlexCol = styled(FlexCol)`
  align-self: center;
`;

export default TransactionCard;
