import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'atomic-router-react';

import { type NavItem } from './nav-items';

interface SidebarNavItemProps {
  item: NavItem;
}

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <Box
      css={{
        '& > a': {
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          px: '3',
          py: '2.5',
          borderRadius: 'md',
          color: 'muted',
          textDecoration: 'none',
          transition: 'background 0.15s ease, color 0.15s ease',
          '&:hover:not(.active)': {
            bg: 'panelAlt',
            color: 'text',
          },
          '&.active': {
            bg: 'navActive',
            color: 'brand',
            fontWeight: '600',
          },
          '& svg': {
            color: 'currentColor',
            flexShrink: 0,
          },
        },
      }}
    >
      <Link to={item.route} activeClassName="active">
        <Flex align="center" gap="3">
          <Icon size={20} strokeWidth={1.75} />
          <Text fontSize="sm" fontWeight="medium" lineHeight="1.25">
            {item.label}
          </Text>
        </Flex>
      </Link>
    </Box>
  );
}
