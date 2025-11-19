import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useLanguage } from "@/contexts/language-provider";

interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  children?: React.ReactNode;
}
export const CommandListDrawer: React.FC<Props> = (props) => {
  const { children, isOpen, setIsOpen } = props;
  const { t } = useLanguage();

  const commands = [
    { cmd: "help", label: t("drawer.commands.help") },
    { cmd: "ai", label: t("drawer.commands.ai") },
    { cmd: "exit", label: t("drawer.commands.exit") },
    { cmd: "goto [section]", label: t("drawer.commands.goto") },
    { cmd: "dark / light", label: t("drawer.commands.theme") },
    { cmd: "en / km", label: t("drawer.commands.lang") },
    { cmd: "customize", label: t("drawer.commands.customize") },
    { cmd: "congrats", label: t("drawer.commands.congrats") },
    { cmd: "reset", label: t("drawer.commands.reset") },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {children && <DrawerTrigger>{children}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="!text-center">
          <DrawerTitle>{t("drawer.title")}</DrawerTitle>
          <DrawerDescription>{t("drawer.description")}</DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 text-sm space-y-1 text-center">
          {commands.map((item) => (
            <p key={item.cmd}>
              <code>{item.cmd}</code> - {item.label}
            </p>
          ))}
        </div>

        <DrawerFooter>
          <Button
            onClick={() => setIsOpen(false)}
            variant="destructive"
            className="text-white"
          >
            {t("drawer.close")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
