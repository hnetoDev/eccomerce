import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ChevronDown, UserCircle } from 'lucide-react';

function PopoverUser({ }) {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex cursor-pointer rounded-3xl items-center justify-center space-x-2">
            <UserCircle className="w-8 h-8 text-muted-foreground" />
            <div className="flex flex-col ">
              <div className="flex space-x-2 justify-center items-center">
                <h1 className="text-sm text-muted-foreground">Minha conta</h1>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <p>Esse é o conteúdo do popover!</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PopoverUser; { }
