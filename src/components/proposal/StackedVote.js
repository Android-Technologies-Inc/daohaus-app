import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { DaoServiceContext, DaoDataContext } from '../../contexts/Store';
import { primary, tertiary, appDark } from '../../variables.styles';

const FullBarDiv = styled.div`
  width: ${(props) =>
    props.page === 'ProposalCard' ? 'calc(100%)!important' : '100%'};
  height: 5px;
  position: relative;
  margin-top: ${(props) => (props.page === 'ProposalCard' ? '50px' : 'auto')};
`;

const LabelsDiv = styled.div`
  position: relative;
  min-height: 5px;
  width: 100%;
`;

const YesLabelSpan = styled.span`
  width: ${(props) =>
    props.page === 'ProposalCard' ? 'auto !important' : '65px'};
  padding: 0px;
  position: absolute;
  top: ${(props) =>
    props.page === 'ProposalCard' ? '-25px !important' : '-50px'};
  left: ${(props) =>
    props.page === 'ProposalCard' ? '0px !important' : '-62px'};
  text-align: ${(props) =>
    props.page === 'ProposalCard' ? 'right' : 'center'};
  background-color: transparent;
  font-weight: 900;
  width: 65px;
  color: ${primary};
`;

const NoLabelSpan = styled.span`
  width: ${(props) =>
    props.page === 'ProposalCard' ? 'auto !important' : '65px'};
  padding: 0px;
  position: absolute;
  top: ${(props) =>
    props.page === 'ProposalCard' ? '-25px !important' : '-50px'};
  right: ${(props) =>
    props.page === 'ProposalCard' ? '0px !important' : '-62px'};
  text-align: ${(props) =>
    props.page === 'ProposalCard' ? 'right' : 'center'};
  background-color: transparent;
  font-weight: 900;
  width: 65px;
  color: ${tertiary};
`;

const BaseBarDiv = styled.div`
  width: 100%;
  height: 5px;
  position: absolute;
  background-color: ${appDark};
`;

const YesBarDiv = styled.div`
  height: 5px;
  position: absolute;
  background-color: ${primary};
  left: 0px;
  width: ${(props) => props.percentageShares + '%'};
`;

const NoBarDiv = styled.div`
  height: 5px;
  right: 0px;
  position: absolute;
  background-color: ${tertiary};
  width: ${(props) => props.percentageShares + '%'};
`;

const QuorumBarDiv = styled.div`
  width: 2px;
  height: 5px;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const StackedVote = ({ id, currentYesVote, currentNoVote, page }) => {
  const [noVoteShares, setNoVoteShares] = useState(0);
  const [yesVoteShares, setYesVoteShares] = useState(0);
  const [percentageSharesYes, setPercentageSharesYes] = useState(0);
  const [percentageSharesNo, setPercentageSharesNo] = useState(0);
  const [daoService] = useContext(DaoServiceContext);
  const [daoData] = useContext(DaoDataContext);

  if (currentYesVote === undefined) {
    currentYesVote = 0;
  }
  if (currentNoVote === undefined) {
    currentNoVote = 0;
  }

  useEffect(() => {
    const currentProposal = async () => {
      console.log('id', id);

      // TODO: why am i doing this? should be using the subgraph
      const info =
        +daoData.version === 2
          ? await daoService.mcDao.proposals(id)
          : await daoService.mcDao.proposalQueue(id);
      console.log('info', info);

      const noVoteShares = parseInt(info.noVotes) + currentNoVote;
      const yesVoteShares = parseInt(info.yesVotes) + currentYesVote;
      const totalVoteShares = noVoteShares + yesVoteShares;
      const percentageSharesYes = (yesVoteShares / totalVoteShares) * 100 || 0;
      const percentageSharesNo = (noVoteShares / totalVoteShares) * 100 || 0;

      console.log(noVoteShares, yesVoteShares, totalVoteShares);

      setNoVoteShares(noVoteShares);
      setYesVoteShares(yesVoteShares);
      setPercentageSharesYes(percentageSharesYes);
      setPercentageSharesNo(percentageSharesNo);
    };

    currentProposal();

    // eslint-disable-next-line
  }, [daoService, id, currentYesVote, currentNoVote]);

  return (
    <FullBarDiv>
      <LabelsDiv>
        <YesLabelSpan page={page}>{yesVoteShares}</YesLabelSpan>
        <NoLabelSpan page={page}>{noVoteShares}</NoLabelSpan>
      </LabelsDiv>
      <BaseBarDiv />
      <YesBarDiv percentageShares={percentageSharesNo} />
      <NoBarDiv percentageShares={percentageSharesYes} />
      <QuorumBarDiv />
    </FullBarDiv>
  );
};

export default StackedVote;
