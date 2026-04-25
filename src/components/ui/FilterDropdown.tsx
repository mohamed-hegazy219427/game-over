import { Menu, Button, Portal, HStack, Text, VStack } from '@chakra-ui/react'
import { ChevronDown } from 'lucide-react'

interface FilterDropdownProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: string[];
  labels?: Record<string, string>;
  onSelect: (v: string) => void;
}

export default function FilterDropdown({ label, icon, value, options, labels = {}, onSelect }: FilterDropdownProps) {
  const displayValue = labels[value] || value.replace(/-/g, ' ')
  
  return (
    <VStack align="flex-start" gap={1}>
      <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" className="text-text-dim px-1">
        {label}
      </Text>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button 
            variant="outline" 
            size="md" 
            minW="40"
            justifyContent="space-between"
            className="border-border-subtle! text-text-secondary! hover:bg-surface-raised! text-sm capitalize"
          >
            <HStack gap={2}>
              {icon}
              {displayValue}
            </HStack>
            <ChevronDown size={14} />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content 
              maxH="64" 
              overflowY="auto" 
              className="bg-surface-raised/95! backdrop-blur-xl border-border-subtle! shadow-2xl"
            >
              {options.map((opt: string) => (
                <Menu.Item
                  key={opt}
                  value={opt}
                  onClick={() => onSelect(opt)}
                  className="text-text-secondary! hover:bg-accent/15! hover:text-accent-glow! text-sm capitalize"
                >
                  {labels[opt] || opt.replace(/-/g, ' ')}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </VStack>
  )
}
