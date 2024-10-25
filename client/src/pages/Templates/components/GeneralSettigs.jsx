import React, { useState, useMemo } from "react";
import { Field, useFormik, FormikProvider } from "formik";
import Select from "react-select";
import {
  Form as BootstrapForm,
  Button,
  Row,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import Files from "react-files";
import TemplateServices from "../../../services/TemplateServices";
import { themes } from "../../../constants";
import { mapperUsers } from "../../../utils/mapperUsers";
import { GeneralSettingsScheme } from "../../../validationsSchemes/GeneralSettingsScheme";
import ErrorText from "../../../components/ErrorText";

// сделать валидацию

const getInitialValue = (template) => {
  return {
    title: template?.title || "",
    description: template?.description || "",
    theme: template?.theme || null,
    image: template?.image || "",
    isPublic: !!template?.isPublic || true,
    users: template?.users || [],
  };
};

const GeneralSettings = ({ template, onSave, users }) => {
  const [displayField, setDisplayField] = useState("email");
  const [isLoadImage, setIsloadImage] = useState(false);

  const INITIAL_VALUES = useMemo(() => getInitialValue(template), [template]);

  const onSubmit = async (fields) => {
    await onSave(fields);
  };

  const onChangeFile = async (file) => {
    setIsloadImage(true);
    try {
      const url = await TemplateServices.uploadFile(file);
      formik.setFieldValue("image", url);
    } catch (e) {
      console.log(e);
    } finally {
      setIsloadImage(false);
    }
  };

  const onRemoveFile = async () => {
    setIsloadImage(true);
    try {
      await TemplateServices.deleteFile(formik.values.image);
      formik.setFieldValue("image", null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsloadImage(false);
    }
  };

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit,
    validationSchema: GeneralSettingsScheme,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikProvider value={formik}>
        <Row className="mb-3">
          <Col>
            <BootstrapForm.Group controlId="formTitle">
              <BootstrapForm.Label>Title (required)</BootstrapForm.Label>
              <Field name="title" as={BootstrapForm.Control} />
              <ErrorText name="title" />
            </BootstrapForm.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <BootstrapForm.Group controlId="formDescription">
              <BootstrapForm.Label>Description (required)</BootstrapForm.Label>
              <SimpleMDE
                value={formik.values.description}
                name="description"
                onChange={(value) => {
                  formik.setFieldValue("description", value);
                }}
              />
              <ErrorText name="description" />
            </BootstrapForm.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <BootstrapForm.Group controlId="formTheme">
              <BootstrapForm.Label>Theme (required)</BootstrapForm.Label>
              <Select
                name="theme"
                value={
                  themes.find((el) => el.value === formik.values.theme) || null
                }
                options={themes}
                onChange={(e) => formik.setFieldValue("theme", e.value)}
              />
              <ErrorText name="theme" />
            </BootstrapForm.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <BootstrapForm.Group controlId="formImage">
              <BootstrapForm.Label>Image</BootstrapForm.Label>
              <Files
                className="files-dropzone mb-3"
                accepts={["image/png"]}
                multiple
                maxFileSize={10000000}
                minFileSize={0}
                clickable
                onChange={(files) => onChangeFile(files[0])}
              >
                <Button>{isLoadImage ? <Spinner /> : "Upload photo"}</Button>
              </Files>
              {formik.values.image && (
                <div className="file-preview-container">
                  <Image width={120} src={formik.values?.image} />
                  <Button onClick={onRemoveFile}>Delete image</Button>
                </div>
              )}
            </BootstrapForm.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <p>mark the template as public or select users</p>
          <Col>
            <BootstrapForm.Group controlId="formPublicAccess">
              <BootstrapForm.Check
                type="checkbox"
                name="isPublic"
                label="Public"
                checked={formik.values.isPublic}
                onChange={(e) => {
                  formik.setFieldValue("isPublic", e.target.checked);
                  if (e.target.checked) {
                    formik.setFieldValue("users", []);
                  }
                }}
              />
              <ErrorText name="isPublic" />
            </BootstrapForm.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <BootstrapForm.Group controlId="formUsersField">
              <BootstrapForm.Label>
                Select Users By (required)
              </BootstrapForm.Label>
              <BootstrapForm.Check
                type="radio"
                label="Name"
                checked={displayField === "name"}
                onChange={() => setDisplayField("name")}
              />
              <BootstrapForm.Check
                type="radio"
                label="Email"
                checked={displayField === "email"}
                onChange={() => setDisplayField("email")}
              />
            </BootstrapForm.Group>
            <BootstrapForm.Group controlId="formUsers">
              <BootstrapForm.Label>Users</BootstrapForm.Label>
              <Select
                isMulti
                name="users"
                options={mapperUsers(users, displayField)}
                onChange={(selectedOptions) => {
                  formik.setFieldValue("users", selectedOptions);
                  if (selectedOptions.length > 0) {
                    formik.setFieldValue("isPublic", false);
                  }
                }}
                getOptionLabel={(option) => option.username || option.email}
                getOptionValue={(option) => option.id}
                isClearable
                value={formik.values.users}
              />
              <ErrorText name="users" />
            </BootstrapForm.Group>
          </Col>
        </Row>
        <Button disabled={formik.isSubmitting || !formik.dirty} type="submit">
          Save temlate
        </Button>
      </FormikProvider>
    </form>
  );
};

export default GeneralSettings;
