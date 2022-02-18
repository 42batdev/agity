import { useUserProfileQuery } from "../../../generated/graphql";
import supabase from "../../../supabase";
import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Dropzone, { DropzoneRef } from "react-dropzone";
import { FiUploadCloud, FiX } from "react-icons/fi";

export interface ProfileSettingsAvatarEditorProps {
  editorRef: MutableRefObject<AvatarEditor | null>;
}

export default function ProfileSettingsAvatarEditor({
  editorRef,
}: ProfileSettingsAvatarEditorProps) {
  const { data } = useUserProfileQuery();

  const [image, setImage] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const dropzoneRef = useRef<DropzoneRef>(null);

  useEffect(() => {
    const filename = data?.getUserProfile?.avatar?.filename;
    if (filename) {
      supabase.storage
        .from("avatars")
        .download(filename)
        .then((result) => {
          if (result.data) {
            setImage(
              new File([result.data], filename, {
                type: "image/jpeg",
                lastModified: -1,
              })
            );
          }
        });
    }
  }, [data]);

  return (
    <Dropzone
      ref={dropzoneRef}
      onDrop={(e) => {
        if (e[0]) {
          setImage(e[0]);
        }
      }}
      accept={["image/jpeg"]}
      maxFiles={1}
      multiple={false}
      maxSize={5000000}
      noKeyboard
      noClick
    >
      {({ getRootProps, getInputProps }) => (
        <SimpleGrid
          {...getRootProps}
          columns={{ sm: 1, md: 2 }}
          spacing={10}
          w="100%"
        >
          <Box>
            <input {...getInputProps()} />
            <AvatarEditor
              ref={(editor) => (editorRef.current = editor)}
              style={{ height: "100%", width: "100%", aspectRatio: "1/1" }}
              borderRadius={125}
              image={image!}
              color={[238, 238, 238, 0.8]}
              rotate={rotation}
              scale={scale}
              disableBoundaryChecks={true}
            />
          </Box>
          <VStack w="100%">
            <HStack w="100%">
              <Button
                aria-label="upload-button"
                rightIcon={<FiUploadCloud />}
                onClick={() => dropzoneRef?.current?.open()}
                isFullWidth
              >
                Upload
              </Button>
              <Button
                aria-label="clear-button"
                rightIcon={<FiX />}
                onClick={() => setImage(null)}
                isFullWidth
              >
                Clear
              </Button>
            </HStack>
            <VStack w="100%" alignItems="flex-start">
              <Text>Adjust Image Scale</Text>
              <Slider
                aria-label="scale-slider"
                isDisabled={image === null}
                value={scale}
                onChange={(e) => setScale(e)}
                step={0.1}
                min={0.1}
                max={10}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </VStack>
            <VStack w="100%" alignItems="flex-start">
              <Text>Adjust Image Rotation</Text>
              <Slider
                aria-label="rotation-slider"
                isDisabled={image === null}
                value={rotation}
                onChange={(e) => setRotation(e)}
                step={1}
                min={-180}
                max={180}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </VStack>
          </VStack>
        </SimpleGrid>
      )}
    </Dropzone>
  );
}
