import $api from "../api";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../index";

class TemplateServices {
  static async getAllTemplates() {
    try {
      const response = await $api.get(`api/templates`);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async getTemplatesByAuthor(userId) {
    try {
      const response = await $api.get(`api/templates/author/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTemplate(authorId, templateId) {
    try {
      const response = await $api.get(
        `/api/templates/author/${authorId}/template/${templateId}`
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async createTemplate(newTemplate) {
    try {
      const response = await $api.post("api/templates/create", newTemplate);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async updateTemplate(authorId, templateId, updatedTemplate) {
    console.log(updatedTemplate);
    try {
      const response = await $api.put(
        `/api/templates/author/${authorId}/template/${templateId}`,
        updatedTemplate
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async deleteTemplate(authorId, templateId) {
    try {
      const response = await $api.delete(
        `/api/templates/author/${authorId}/template/${templateId}`
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  static async uploadFile(fileObject) {
    const blobUrl = fileObject.preview.url;
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    const fileName = `uploads/${fileObject.id}.${fileObject.extension}`;
    const storageRef = ref(storage, fileName);

    try {
      await uploadBytes(storageRef, blob);
      const fileUrl = await getDownloadURL(storageRef);
      console.log("File available at:", fileUrl);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  static async deleteFile(url) {
    const desertRef = ref(storage, url);
    try {
      await deleteObject(desertRef);

      console.log(`Successfully deleted file: ${url}`);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }
}

export default TemplateServices;
