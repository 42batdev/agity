import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SkeletonCircle,
  Tooltip,
} from "@chakra-ui/react";
import debounce from "lodash/debounce";
import { useRef, useState } from "react";
import { FiCheckCircle, FiHelpCircle, FiXCircle } from "react-icons/fi";

export type ValidationResult = "LOADING" | "VALID" | "ERROR";

export interface ValidateInputProps {
  onChange?: (value: string) => void;
  onValidate: (value: string) => Promise<boolean>;
  helpLabel: string;
  inputProps: any;
}

const ValidateInput = ({
  onChange,
  onValidate,
  helpLabel,
  inputProps,
}: ValidateInputProps) => {
  const [validationResult, setValidationResult] = useState<ValidationResult>();

  const debouncedValidation = useRef(
    debounce((value: string) => {
      setValidationResult("LOADING");
      onValidate(value).then((exists) => {
        if (exists) {
          setValidationResult("ERROR");
        } else {
          setValidationResult("VALID");
        }
      });
    }, 300)
  );

  return (
    <InputGroup>
      <InputLeftElement>
        <Tooltip label={helpLabel}>
          <span>
            <FiHelpCircle color="grey" />
          </span>
        </Tooltip>
      </InputLeftElement>
      <Input
        {...inputProps}
        onChange={(e) => {
          const value = e.currentTarget.value;
          debouncedValidation.current.cancel();
          if (value && value.length > 0) {
            setValidationResult("LOADING");
            debouncedValidation.current(value);
          }
          if (onChange) onChange(value);
        }}
      />
      <InputRightElement>
        {validationResult === "LOADING" && (
          <SkeletonCircle w="1.25rem" h="1.25rem" />
        )}
        {validationResult === "ERROR" && (
          <Tooltip label="This user ID is not available.">
            <span>
              <FiXCircle color="red" />
            </span>
          </Tooltip>
        )}
        {validationResult === "VALID" && (
          <Tooltip label="This user ID is available">
            <span>
              <FiCheckCircle color="green" />
            </span>
          </Tooltip>
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default ValidateInput;
