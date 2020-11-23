import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Flex,
  Icon,
  Image,
  Link,
  Button,
  ButtonGroup,
  Box,
  Spacer,
  Stack,
  IconButton,
} from '@chakra-ui/core';

import { motion } from 'framer-motion';
import { useDao, useRefetchQuery } from '../../contexts/PokemolContext';
import ChangeDao from '../Shared/ChangeDao';

import Header from '../Shared/Header';
import SideNav from '../Shared/SideNav';

import {
  RiBookMarkLine,
  RiDiscordFill,
  RiTelegramFill,
  RiMediumFill,
  RiGlobeLine,
  RiLinksLine,
  RiMenu3Line,
  RiTeamLine,
  RiSettings3Line,
  RiBankLine,
  RiTrophyLine,
  RiQuestionLine,
  RiFireLine,
  RiRocket2Line,
} from 'react-icons/ri';
import { GiCastle } from 'react-icons/gi';
import { useTheme, useSideNavToggle } from '../../contexts/CustomThemeContext';

const Layout = ({ children }) => {
  const [sideNavOpen, toggleSideNav] = useSideNavToggle();
  const [dao] = useDao();
  const [theme] = useTheme();
  const history = useHistory();
  const [, updateRefetchQuery] = useRefetchQuery();

  const MotionBox = motion.custom(Box);
  const MotionFlex = motion.custom(Flex);

  const bar = {
    open: { width: 420 },
    closed: { width: 100 },
  };

  const nav = {
    open: {
      opacity: 1,
      pointerEvents: 'all',
      marginLeft: '25px',
      display: 'inline-block',
    },
    closed: {
      opacity: 0,
      pointerEvents: 'none',
      marginLeft: '0px',
      display: 'none',
    },
  };

  const navLinks = {
    open: {
      opacity: 1,
      pointerEvents: 'all',
      marginLeft: '25px',
    },
    closed: {
      opacity: 0,
      pointerEvents: 'none',
      marginLeft: '0px',
    },
  };

  const background = {
    open: {
      width: 'calc(100% - ' + bar.open.width + 'px)',
      marginLeft: bar.open.width + 'px',
    },
    closed: {
      width: 'calc(100% - ' + bar.closed.width + 'px)',
      marginLeft: bar.closed.width + 'px',
    },
  };

  const layout = {
    open: {
      width: 'calc(100% - ' + bar.open.width + 'px)',
      marginLeft: bar.open.width + 'px',
    },
    closed: {
      width: 'calc(100% - ' + bar.closed.width + 'px)',
      marginLeft: bar.closed.width + 'px',
    },
  };

  return (
    <Flex direction='row' minH='100vh' color='white' w='100vw'>
      <MotionFlex
        h='100vh'
        w='100%'
        p={6}
        position='fixed'
        direction='row'
        align='start'
        justifyContent='start'
        bg='primary.500'
        variants={bar}
        animate={sideNavOpen ? 'closed' : 'open'}
        initial='open'
        zIndex='1'
        transition={{ ease: 'easeInOut', duration: 0.15 }}
        overflow='hidden'
      >
        <Flex direction='column' justify='start' align='start' h='100%'>
          <Flex align='center' justify='start' w='100%' direction='row'>
            <Box as={RouterLink} to={`/dao/${dao.address}`}>
              <Image
                src={theme.images.brandImg}
                w='60px'
                h='60px'
                cursor='pointer'
                border='none'
              />
            </Box>
            <MotionFlex
              direction='column'
              align='start'
              justify='start'
              variants={navLinks}
              animate={sideNavOpen ? 'closed' : 'open'}
              transition={{ ease: 'easeInOut', duration: 0.15 }}
              inital='open'
              w='100%'
            >
              {dao?.graphData ? (
                <Link as={RouterLink} to={`/dao/${dao.address}`} fontSize='xl'>
                  {dao.name}
                </Link>
              ) : (
                <Link as={RouterLink} to={`/`} fontSize='xl'>
                  DAOhaus Hub
                </Link>
              )}
              <ChangeDao />
            </MotionFlex>
          </Flex>
          <IconButton
            variant='ghost'
            icon={<RiMenu3Line />}
            onClick={toggleSideNav}
            size='lg'
            isRound='true'
            color='secondary.500'
            mt={6}
          />
          {dao?.graphData ? (
            <Stack spacing={3} d='flex' flexDirection='column' mt='55px'>
              <Button
                variant='sideNav'
                as={RouterLink}
                to={`/dao/${dao.address}/proposals`}
                _hover={{ backgroundColor: 'white' }}
                grow='none'
              >
                <Icon as={RiBookMarkLine} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='2xl'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  {theme.daoMeta.proposals}
                </MotionBox>
              </Button>
              <Button
                variant='sideNav'
                as={RouterLink}
                to={`/dao/${dao.address}/bank`}
                _hover={{ backgroundColor: 'white' }}
                grow='none'
              >
                <Icon as={RiBankLine} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='2xl'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  {theme.daoMeta.bank}
                </MotionBox>
              </Button>
              <Button
                variant='sideNav'
                as={RouterLink}
                to={`/dao/${dao.address}/members`}
                _hover={{ backgroundColor: 'white' }}
              >
                <Icon as={RiTeamLine} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='2xl'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  {theme.daoMeta.members}
                </MotionBox>
              </Button>
              <Button
                variant='sideNav'
                as={RouterLink}
                to={`/dao/${dao.address}/settings`}
                _hover={{ backgroundColor: 'white' }}
              >
                <Icon as={RiSettings3Line} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='sm'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  Settings
                </MotionBox>
              </Button>
              <Button
                variant='sideNav'
                as={RouterLink}
                to={`/dao/${dao.address}/settings/boosts`}
                _hover={{ backgroundColor: 'white' }}
              >
                <Icon as={RiRocket2Line} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='sm'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  Boosts
                </MotionBox>
              </Button>
              <Button
                variant='sideNav'
                as={RouterLink}
                to={`/dao/${dao.address}/profile`}
                _hover={{ backgroundColor: 'white' }}
              >
                <Icon as={RiTrophyLine} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='sm'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  Stats
                </MotionBox>
              </Button>
            </Stack>
          ) : (
            <Stack spacing={3} d='flex' flexDirection='column' mt='55px'>
              <Button
                variant='sideNav'
                as={Link}
                href='https://daohaus.club'
                isExternal
                _hover={{ backgroundColor: 'white' }}
                grow='none'
              >
                <Icon as={RiBookMarkLine} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='2xl'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  Explore DAOs
                </MotionBox>
              </Button>
              <Button
                variant='sideNav'
                as={Link}
                href='https://daohaus.club/summon'
                _hover={{ backgroundColor: 'white' }}
                grow='none'
              >
                <Icon as={RiFireLine} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='2xl'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  Summon a DAO
                </MotionBox>
              </Button>
              <Button
                variant='sideNav'
                as={Link}
                href={`https://xdai.pokemol.com/dao/0x283bdc900b6ec9397abb721c5bbff5ace46e0f50`}
                isExternal
                _hover={{ backgroundColor: 'white' }}
              >
                <Icon as={RiTeamLine} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='2xl'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  HausDAO
                </MotionBox>
              </Button>
              <Button
                variant='sideNav'
                as={Link}
                href='https://daohaus.club/help'
                isExternal
                _hover={{ backgroundColor: 'white' }}
              >
                <Icon as={RiQuestionLine} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='sm'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  Help
                </MotionBox>
              </Button>
              <Button
                variant='sideNav'
                as={Link}
                href='https://daohaus.club/about'
                isExternal
                _hover={{ backgroundColor: 'white' }}
              >
                <Icon as={GiCastle} w={6} h={6} />
                <MotionBox
                  initial='closed'
                  fontSize='sm'
                  fontFamily='heading'
                  variants={nav}
                  animate={sideNavOpen ? 'closed' : 'open'}
                  transition={{ ease: 'easeInOut', duration: 0.15 }}
                >
                  About
                </MotionBox>
              </Button>
            </Stack>
          )}
          <Spacer />
          <Flex w='100%'>
            <IconButton
              icon={<RiLinksLine />}
              size='lg'
              variant='ghost'
              isRound='true'
              onClick={toggleSideNav}
            />

            <MotionFlex
              direction='row'
              align='center'
              justify='start'
              variants={navLinks}
              animate={sideNavOpen ? 'closed' : 'open'}
              transition={{ ease: 'easeInOut', duration: 0.15 }}
              w='100%'
            >
              <ButtonGroup>
                {theme.daoMeta.website !== '' && (
                  <IconButton
                    as={Link}
                    icon={<RiGlobeLine />}
                    href={theme.daoMeta.website}
                    isExternal
                    size='lg'
                    variant='link'
                    isRound='true'
                  />
                )}
                {theme.daoMeta.discord !== '' && (
                  <IconButton
                    as={Link}
                    icon={<RiDiscordFill />}
                    href={theme.daoMeta.discord}
                    isExternal
                    size='lg'
                    variant='link'
                    isRound='true'
                  />
                )}
                {theme.daoMeta.telegram !== '' && (
                  <IconButton
                    as={Link}
                    icon={<RiTelegramFill />}
                    href={theme.daoMeta.telegram}
                    isExternal
                    size='lg'
                    variant='link'
                    isRound='true'
                  />
                )}
                {theme.daoMeta.medium !== '' && (
                  <IconButton
                    as={Link}
                    icon={<RiMediumFill />}
                    href={theme.daoMeta.medium}
                    isExternal
                    size='lg'
                    variant='link'
                    isRound='true'
                  />
                )}
                {theme.daoMeta.other !== '' && (
                  <IconButton
                    as={Link}
                    icon={<RiLinksLine />}
                    href={theme.daoMeta.other}
                    isExternal
                    size='lg'
                    variant='link'
                    isRound='true'
                  />
                )}
              </ButtonGroup>
            </MotionFlex>
          </Flex>
        </Flex>
      </MotionFlex>

      <MotionBox
        position='fixed'
        initial='open'
        variants={background}
        animate={sideNavOpen ? 'closed' : 'open'}
        h='100vh'
        bgImage={'url(' + theme.images.bgImg + ')'}
        bgSize='cover'
        bgPosition='center'
        zIndex='-1'
        top='0'
        right='0'
        transition={{ ease: 'easeInOut', duration: 0.15 }}
        _before={{
          display: 'block',
          content: '""',
          position: 'absolute',
          w: '100%',
          h: '100%',
          bgColor: 'background.500',
          opacity: theme.styles.bgOverlayOpacity,
          pointerEvents: 'none',
          top: '0',
          right: '0',
          zIndex: '-1',
        }}
      />
      <MotionFlex
        width='100%'
        initial='open'
        variants={layout}
        animate={sideNavOpen ? 'closed' : 'open'}
        flexDirection='column'
        transition={{ ease: 'easeInOut', duration: 0.15 }}
      >
        <Header></Header>
        {children}
      </MotionFlex>
    </Flex>
  );
};

export default Layout;