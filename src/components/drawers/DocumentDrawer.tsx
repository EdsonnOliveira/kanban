import { useState } from 'react';
import { Upload, FolderPlus, FileText, User, ChevronDown, Tag, Share } from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import TypeSelector, { TypeOption } from '../TypeSelector';
import { useDocumentDrawerStore, DocumentFileFormData, DocumentFolderFormData } from '../../store/useDocumentDrawerStore';

export default function DocumentDrawer() {
  const { isDocumentDrawerOpen, drawerType, closeDocumentDrawer, saveDocument, openDocumentDrawer } = useDocumentDrawerStore();
  
  // Estado local do formulário de arquivo
  const [fileFormData, setFileFormData] = useState<DocumentFileFormData>({
    fileName: '',
    fileType: 'document',
    fileSize: '',
    description: '',
    owner: '',
    shared: false,
    tags: ''
  });

  // Estado local do formulário de pasta
  const [folderFormData, setFolderFormData] = useState<DocumentFolderFormData>({
    folderName: '',
    description: '',
    color: 'blue',
    owner: '',
    shared: false
  });

  const handleFileInputChange = (field: keyof DocumentFileFormData, value: string | boolean) => {
    setFileFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFolderInputChange = (field: keyof DocumentFolderFormData, value: string | boolean) => {
    setFolderFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (drawerType === 'file') {
      saveDocument(fileFormData);
    } else if (drawerType === 'folder') {
      saveDocument(folderFormData);
    }
    
    // Resetar formulários após salvar
    setFileFormData({
      fileName: '',
      fileType: 'document',
      fileSize: '',
      description: '',
      owner: '',
      shared: false,
      tags: ''
    });
    
    setFolderFormData({
      folderName: '',
      description: '',
      color: 'blue',
      owner: '',
      shared: false
    });
    
    closeDocumentDrawer();
  };

  const handleClose = () => {
    closeDocumentDrawer();
    
    // Resetar formulários ao fechar
    setFileFormData({
      fileName: '',
      fileType: 'document',
      fileSize: '',
      description: '',
      owner: '',
      shared: false,
      tags: ''
    });
    
    setFolderFormData({
      folderName: '',
      description: '',
      color: 'blue',
      owner: '',
      shared: false
    });
  };

  const getTitle = () => {
    if (drawerType === 'file') return 'Upload de Arquivo';
    if (drawerType === 'folder') return 'Nova Pasta';
    return 'Novo Documento';
  };

  const documentTypeOptions: TypeOption[] = [
    {
      id: 'file',
      title: 'Upload de Arquivo',
      description: 'Adicionar um novo arquivo ao sistema',
      icon: Upload,
      color: 'blue',
      onClick: () => openDocumentDrawer('file')
    },
    {
      id: 'folder',
      title: 'Nova Pasta',
      description: 'Criar uma nova pasta para organizar arquivos',
      icon: FolderPlus,
      color: 'green',
      onClick: () => openDocumentDrawer('folder')
    }
  ];

  const renderContent = () => {
    if (!drawerType) {
      return (
        <TypeSelector
          title="O que você gostaria de criar?"
          options={documentTypeOptions}
        />
      );
    }
    
    if (drawerType === 'file') {
      return renderFileForm();
    }
    
    if (drawerType === 'folder') {
      return renderFolderForm();
    }
    
    return null;
  };

  const renderFileForm = () => (
    <>
      {/* Nome do Arquivo */}
      <Input
        placeholder="Digite o nome do arquivo"
        size="middle"
        label="Nome do Arquivo"
        leftIcon={FileText}
        value={fileFormData.fileName}
        onChange={(value) => handleFileInputChange('fileName', value)}
      />

      {/* Tipo e Tamanho - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          placeholder="Selecione o tipo"
          size="middle"
          label="Tipo do Arquivo"
          rightIcon={ChevronDown}
          options={[
            { value: "document", label: "Documento" },
            { value: "image", label: "Imagem" },
            { value: "pdf", label: "PDF" },
            { value: "spreadsheet", label: "Planilha" },
            { value: "presentation", label: "Apresentação" }
          ]}
          value={fileFormData.fileType}
          onChange={(value) => handleFileInputChange('fileType', value)}
        />
        <Input
          placeholder="Ex: 2.5 MB"
          size="middle"
          label="Tamanho do Arquivo"
          value={fileFormData.fileSize}
          onChange={(value) => handleFileInputChange('fileSize', value)}
        />
      </div>

      {/* Descrição */}
      <Input
        type="textarea"
        placeholder="Descrição do arquivo"
        size="middle"
        label="Descrição"
        rows={3}
        value={fileFormData.description}
        onChange={(value) => handleFileInputChange('description', value)}
      />

      {/* Proprietário e Tags - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Nome do proprietário"
          size="middle"
          label="Proprietário"
          leftIcon={User}
          value={fileFormData.owner}
          onChange={(value) => handleFileInputChange('owner', value)}
        />
        <Input
          placeholder="Ex: trabalho, importante"
          size="middle"
          label="Tags"
          leftIcon={Tag}
          value={fileFormData.tags}
          onChange={(value) => handleFileInputChange('tags', value)}
        />
      </div>

      {/* Compartilhamento */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="shared"
          checked={fileFormData.shared}
          onChange={(e) => handleFileInputChange('shared', e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="shared" className="flex items-center gap-2 text-sm text-gray-700">
          <Share size={16} className="text-gray-500" />
          Arquivo compartilhado
        </label>
      </div>
    </>
  );

  const renderFolderForm = () => (
    <>
      {/* Nome da Pasta */}
      <Input
        placeholder="Digite o nome da pasta"
        size="middle"
        label="Nome da Pasta"
        leftIcon={FolderPlus}
        value={folderFormData.folderName}
        onChange={(value) => handleFolderInputChange('folderName', value)}
      />

      {/* Descrição */}
      <Input
        type="textarea"
        placeholder="Descrição da pasta"
        size="middle"
        label="Descrição"
        rows={3}
        value={folderFormData.description}
        onChange={(value) => handleFolderInputChange('description', value)}
      />

      {/* Cor e Proprietário - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          placeholder="Selecione a cor"
          size="middle"
          label="Cor da Pasta"
          rightIcon={ChevronDown}
          options={[
            { value: "blue", label: "Azul" },
            { value: "green", label: "Verde" },
            { value: "purple", label: "Roxo" },
            { value: "orange", label: "Laranja" },
            { value: "red", label: "Vermelho" },
            { value: "yellow", label: "Amarelo" }
          ]}
          value={folderFormData.color}
          onChange={(value) => handleFolderInputChange('color', value)}
        />
        <Input
          placeholder="Nome do proprietário"
          size="middle"
          label="Proprietário"
          leftIcon={User}
          value={folderFormData.owner}
          onChange={(value) => handleFolderInputChange('owner', value)}
        />
      </div>

      {/* Compartilhamento */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="folderShared"
          checked={folderFormData.shared}
          onChange={(e) => handleFolderInputChange('shared', e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="folderShared" className="flex items-center gap-2 text-sm text-gray-700">
          <Share size={16} className="text-gray-500" />
          Pasta compartilhada
        </label>
      </div>
    </>
  );

  return (
    <Drawer
      isOpen={isDocumentDrawerOpen}
      onClose={handleClose}
      onSave={drawerType ? handleSave : undefined}
      title={getTitle()}
      width="w-96"
    >
      {renderContent()}
    </Drawer>
  );
}
