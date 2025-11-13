import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MessageMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function MessageMenu({ onEdit, onDelete }: MessageMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="MoreVertical" size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => { onEdit(); setOpen(false); }}>
          <Icon name="Edit" size={16} className="mr-2" />
          Редактировать
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => { onDelete(); setOpen(false); }} 
          className="text-red-600"
        >
          <Icon name="Trash2" size={16} className="mr-2" />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
