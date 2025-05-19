import React, { useState, useEffect, useRef } from 'react';
import logo from './images/drawnout.svg'

const PixelArt = () => {
  // Refs
  const containerRef = useRef(null);

  // State variables
  const [currentColor, setCurrentColor] = useState("#000000");
  const [showGrid, setShowGrid] = useState(true);
  const [pixelData, setPixelData] = useState([]);
  const [dimensions, setDimensions] = useState({ rows: 26, cols: 55 });
  const [pixelSize, setPixelSize] = useState(30); // Starting pixel size in px

  // Undo/Redo stacks
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Calculate grid dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = window.innerWidth - 40; // 20px padding on each side
        const containerHeight = window.innerHeight - 120; // Space for controls

        // Calculate how many pixels we can fit
        const cols = Math.floor(containerWidth / pixelSize);
        const rows = Math.floor(containerHeight / pixelSize);

        setDimensions({ rows, cols });
      }
    };

    // Initial calculation
    updateDimensions();

    // Recalculate on window resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [pixelSize]);

  // Initialize pixel data when dimensions change
  useEffect(() => {
    const { rows, cols } = dimensions;

    // Only initialize if we don't already have data or if dimensions changed
    if (!pixelData.length || pixelData.length !== rows || (pixelData[0] && pixelData[0].length !== cols)) {
      initializeCanvas(rows, cols);
      // Clear undo/redo stacks on resize
      setUndoStack([]);
      setRedoStack([]);
    }
    // eslint-disable-next-line
  }, [dimensions]);

  // Initialize canvas with white pixels
  const initializeCanvas = (rows, cols) => {
    const initialData = Array(rows).fill().map(() =>
      Array(cols).fill().map(() => ({
        red: 255,
        green: 255,
        blue: 255
      }))
    );
    setPixelData(initialData);
  };

  // Update color from color picker
  const updateColor = (e) => {
    const hexColor = e.target.value;
    setCurrentColor(hexColor);
  };

  // Set current color to white (erase)
  const handleErase = () => {
    setCurrentColor("#FFFFFF");
  };

  // Clear entire canvas (with undo support)
  const clearCanvas = () => {
    setPixelData(prev => {
      setUndoStack(stack => [...stack, JSON.parse(JSON.stringify(prev))]);
      setRedoStack([]);
      const initialData = Array(dimensions.rows).fill().map(() =>
        Array(dimensions.cols).fill().map(() => ({
          red: 255,
          green: 255,
          blue: 255
        }))
      );
      return initialData;
    });
  };

  // Change pixel size
  const changePixelSize = (newSize) => {
    setPixelSize(newSize);
  };

  // Update pixel color when clicked or dragged over (with undo support)
  const handlePixelInteraction = (rowIndex, colIndex) => {
    // Convert hex color to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
      } : { red: 0, green: 0, blue: 0 };
    };

    const rgbColor = hexToRgb(currentColor);

    setPixelData(prev => {
      // Only push to undoStack if the pixel is actually changing
      if (
        prev[rowIndex] &&
        prev[rowIndex][colIndex] &&
        (
          prev[rowIndex][colIndex].red !== rgbColor.red ||
          prev[rowIndex][colIndex].green !== rgbColor.green ||
          prev[rowIndex][colIndex].blue !== rgbColor.blue
        )
      ) {
        setUndoStack(stack => [...stack, JSON.parse(JSON.stringify(prev))]);
        setRedoStack([]);
      }
      const newData = prev.map(row => row.map(pixel => ({ ...pixel })));
      if (newData[rowIndex] && newData[rowIndex][colIndex]) {
        newData[rowIndex][colIndex] = {
          red: rgbColor.red,
          green: rgbColor.green,
          blue: rgbColor.blue
        };
      }
      return newData;
    });
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(undoStack.slice(0, -1));
    setRedoStack([...redoStack, JSON.parse(JSON.stringify(pixelData))]);
    setPixelData(prev);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    setUndoStack([...undoStack, JSON.parse(JSON.stringify(pixelData))]);
    setPixelData(next);
  };

  return (
    <div className="pixel-art-app" style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '0',
      margin: '0',
      background: '#f0f0f0'
    }}>
      <div className="controls-bar" style={{
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        zIndex: 10
      }}>
        <img
          src={logo}
          height="40"
          style={{ marginRight: '20px' }}
          draggable="false"
          alt="Drawn Out Logo"
        />

        <div className="pixel-color-selector">
          <span>Color:</span>
          <div className="color-input-wrapper">
            <input
              type="color"
              value={currentColor}
              onChange={updateColor}
            />
          </div>
        </div>

        <button
          onClick={handleErase}
          style={{
            padding: '6px 12px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Erase
        </button>

        <button
          className='clear-button'
          onClick={clearCanvas}
          style={{
            padding: '6px 12px',
            backgroundColor: '#7f8c8d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '15px'
          }}
        >
          Clear
        </button>

        <button
          onClick={handleUndo}
          style={{
            padding: '6px 12px',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
          disabled={undoStack.length === 0}
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          style={{
            padding: '6px 12px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '15px'
          }}
          disabled={redoStack.length === 0}
        >
          Redo
        </button>

        <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
          <label style={{ marginRight: '8px' }}>Pixel Size:</label>
          <select
            value={pixelSize}
            onChange={(e) => changePixelSize(Number(e.target.value))}
            style={{ padding: '4px 8px' }}
          >
            <option value={20}>Small (20px)</option>
            <option value={30}>Medium (30px)</option>
            <option value={40}>Large (40px)</option>
          </select>
        </div>

        <label style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px' }}>Grid:</span>
          <div style={{
            position: 'relative',
            display: 'inline-block',
            width: '40px',
            height: '24px'
          }}>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={() => setShowGrid(!showGrid)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: showGrid ? '#2196f3' : '#ccc',
              transition: '0.4s',
              borderRadius: '34px'
            }}>
              <span style={{
                position: 'absolute',
                height: '16px',
                width: '16px',
                left: '4px',
                bottom: '4px',
                backgroundColor: 'white',
                transition: '0.4s',
                borderRadius: '50%',
                transform: showGrid ? 'translateX(16px)' : 'translateX(0)'
              }}></span>
            </span>
          </div>
        </label>
      </div>

      <div
        ref={containerRef}
        className="canvas-container"
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '20px',
          boxSizing: 'border-box'
        }}
      >
        <table
          className="canvas"
          cellSpacing="0"
          cellPadding="0"
          style={{
            borderCollapse: 'collapse',
            margin: '0 auto'
          }}
        >
          <tbody
            className="pixel-grid">
            {pixelData.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((pixel, colIndex) => (
                  <td
                    className="pixel"
                    key={`cell-${rowIndex}-${colIndex}`}
                    style={{
                      backgroundColor: `rgb(${pixel.red}, ${pixel.green}, ${pixel.blue})`,
                      height: `${pixelSize}px`,
                      width: `${pixelSize}px`,
                      border: showGrid ? '1px solid lightgray' : 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                    onClick={() => handlePixelInteraction(rowIndex, colIndex)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      handlePixelInteraction(rowIndex, colIndex);
                    }}
                    draggable="true"
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PixelArt;