interface featuresProps {
  title: string;
  description: string;
  icon: string;
}

export type ApiResponse = {
  status: "success" | "error";
  message: string;
};
