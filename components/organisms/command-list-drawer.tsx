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
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {children && <DrawerTrigger>{children}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="!text-center">
          <DrawerTitle>{t("drawer.title")}</DrawerTitle>
          <DrawerDescription>{t("drawer.description")}</DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 text-sm space-y-1 text-center">
          <p>
            <code>help</code> – {t("drawer.commands.help")}
          </p>
          <p>
            <code>commands</code> – {t("drawer.commands.commands")}
          </p>
          <p>
            <code>exit</code> – {t("drawer.commands.exit")}
          </p>
          <p>
            <code>goto [section]</code> – {t("drawer.commands.goto")}
          </p>
          <p>
            <code>dark / light</code> – {t("drawer.commands.theme")}
          </p>
          <p>
            <code>en / km</code> – {t("drawer.commands.lang")}
          </p>
          <p>
            <code>customize</code> – {t("drawer.commands.customize")}
          </p>
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
